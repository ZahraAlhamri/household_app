import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/provider/firestore.service';
import { AuthenticationService } from 'src/app/provider/authentication.service';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ElementFinder } from 'protractor';
//import { auth } from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  id;
  uType;
  item;
  name;
  type;
  price;
  quantity;
  description;
  msg;
  loaderToShow: any;
  uid;
  status;
  photo;
  orderQty=1;
  successMessage: string = '';
  errorMessage: string = '';
  validations_form: FormGroup;
  public uploadfile;
  public filename;
  TodayDate= new Date();
  validation_messages = {
    'name': [
      { type: 'minlength', message: 'name must have atleats 3 letters.' },
      { type: 'required', message: 'name is required.' },
      { type: 'pattern', message: 'Enter a valid name.' }
    ],
    'type': [
      { type: 'minlength', message: 'type must have atleats 3 letters.' },
      { type: 'required', message: 'type is required.' },
      { type: 'pattern', message: 'Enter a valid type.' }
    ],
    'description': [
      { type: 'pattern', message: 'Enter a valid Dsecription.' }
    ],
    'quantity': [
      { type: 'required' , message: 'Quantity is required'},
      { type: 'pattern', message: 'Enter a valid quantity.' }
    ],
    'price': [
      { type: 'required' , message: 'price is required'},
      { type: 'pattern', message: 'Enter a valid price.' }
    ],
  };

  constructor(
    private alertController:AlertController,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private firestore: FirestoreService,
    private loader: LoadingController,
    private alert: AlertController,
    private menuCtrl: MenuController,
    public ModalCtrl:ModalController,
    public toastController: ToastController,
    public  route: ActivatedRoute,) { }

  ngOnInit() {
    this.uid = localStorage.getItem('uid');
    this.uType = localStorage.getItem('uType');
    this.id=this.route.snapshot.paramMap.get('id');
    this.firestore.getItem(this.id).valueChanges().subscribe(
      async item=>{
        this.item = item;
        this.name=this.item.name;
        this.type=this.item.type;
        this.price=this.item.price;
        this.quantity=this.item.quantity;
        this.description=this.item.description;
        this.photo=this.item.photo;
        this.status=this.item.status;
      });
      this.validations_form = this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9][" "a-zA-Z]*[a-zA-Z]$')
        ])),
        price: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+[.][0-9]+$')
        ])),
        type: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9][" "a-zA-Z]*[a-zA-Z]$')
        ])),
        quantity: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ])),
        description: new FormControl('', Validators.compose([
          Validators.pattern('^[a-zA-Z0-9][" "a-zA-Z0-9 \n]*[a-zA-Z]$')
        ])),

      });


  }
  store(){
      if(this.uploadfile){
      let name;
      name = this.id;
      console.log(name);
      var imageRef = firebase.storage().ref().child("items/"+name);
      imageRef.put(this.uploadfile).then(
        res=>{
          imageRef.getDownloadURL().then(
            image=>{
              this.photo=image;
              console.log(image);
              firebase
              .firestore()
              .doc(`/items/${name}`).update({
                photo:image
              })
            }
          )
        }
      )
    }
    this.hideLoader();
    this.msg = "Item added successfully";
    this.presentToast();
    this.navCtrl.navigateForward('/merchant-home');
  }
  HandleFileSelect(evt){
    if(evt.target.files && evt.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.photo = event.target.result;
      }
      reader.readAsDataURL(evt.target.files[0]);
    }
      let fileList: FileList = evt.target.files;
      let file: File = fileList[0];
      console.log(file);
      this.uploadfile = evt.target.files[0];
    this.filename = evt.target.files[0].name;
  }
  upadteItem(){
    this.firestore.updateItem(this.id,this.name,this.type,this.price,this.quantity, this.description,this.TodayDate).then((res) => {
      this.msg="the item has been updated successfully";
      this.store();
      this.presentToast();
      this.navCtrl.navigateForward('merchant-home');
    }, err => {
       this.msg = err.message;
      this.hideLoader();
      this.presentToast();

    });
  }
  Delete(){
    this.firestore.deletItem(this.id).then((res) => {
      this.msg="the item has been deleted successfully";
      this.presentToast();
      this.navCtrl.navigateForward('merchant-home');
    }, err => {
       this.msg = err.message;
      this.hideLoader();
      this.presentToast();

    });
  }
  Recovery(){
    this.firestore.recoveryItem(this.id).then((res) => {
      this.msg="the item has been recover successfully";
      this.presentToast();
      this.navCtrl.navigateForward('merchant-home');
    }, err => {
       this.msg = err.message;
      this.hideLoader();
      this.presentToast();

    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.msg,
      duration: 4000
    });
    toast.present();
  }
  showLoader() {
    this.loaderToShow = this.loader.create({
      spinner: 'lines-small',
      cssClass:'custom-loader-class'
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

  hideLoader() {
    this.loader.dismiss();
  }
  incOrderQty(){
    if(this.orderQty==this.quantity){
      this.msg='this quantity is not available';
      this.presentToast();

    }
    if(this.orderQty<this.quantity){
      this.orderQty++;
    }
  }
  decOrderQty(){
    if(this.orderQty>1){
      this.orderQty--;
    }
  }
  addToWishlist(){
    this.msg='The product is added to your wishlist';
    this.presentToast();
    this.firestore.addToWishlist(this.uid,this.id);
  }
  addToCart(){
    this.msg='The product is added to your cart';
    this.presentToast();
    this.firestore.addToCart(this.uid,this.id,this.orderQty);
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message:'Add '+this.orderQty+' '+this.name+' To your Cart',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.addToCart()          }
        }
      ]
    });
    await alert.present();
  }
  checkQuantity(){
    if(this.orderQty>this.price){
      this.msg='this quantity is not available'
      this.presentToast();
      this.orderQty=0;
    }
    else
      this.presentAlertConfirm();
  }
  mDelete(){
    this.firestore.deleteItem(this.id).then((res) => {
      this.msg="the item has been deleted successfully";
      this.presentToast();
      this.navCtrl.navigateForward('merchant-home');
    }, err => {
       this.msg = err.message;
      this.hideLoader();
      this.presentToast();
    });
  }

 gotoadd(){

      this.navCtrl.navigateForward('/addreviews/'+this.id);

    }

    gotoview(){
      this.navCtrl.navigateForward('/viewreviews/'+this.id);
    }
    gotodiscount(){
      this.navCtrl.navigateForward('/adddiscount/'+this.id);
    }
  

}
