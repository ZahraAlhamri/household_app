import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { FirestoreService } from 'src/app/provider/firestore.service';
import { AuthenticationService } from 'src/app/provider/authentication.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ElementFinder } from 'protractor';
//import { auth } from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  
  successMessage: string = '';
  errorMessage: string = '';
  loaderToShow;
  validations_form: FormGroup;
  uid;
  itemid;
  address;
  lat;
  long;
  kutti = "Ramsi";
  cooked;
  //public uimage = "../../../assets/images/default-food.png";
  public uploadfile;
  public filename;
  msg;
  photo;;
  uType;

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
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController, 
    private authService: AuthenticationService, 
    private formBuilder: FormBuilder, 
    private firestore: FirestoreService, 
    private loader: LoadingController,
    private alert: AlertController,
    private menuCtrl: MenuController,
    public ModalCtrl:ModalController,
    public toastController: ToastController) { }

    ngOnInit() {
      this.uid = localStorage.getItem("uid")
      this.uType = localStorage.getItem('uType');
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
        name = this.itemid;
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
    Additem(value){
      this.showLoader();
  
      let item = {
        name: value.name,
        description: value.description,
        type: value.type,
        price: value.price,
        quantity: value.quantity,
        uid: this.uid,
        status: "Available",
        addedDate: this.TodayDate,
        addedBy:this.uid,
        rating:0
      }
  
      this.firestore.additem(item)
      .then((res)=>{
        console.log(res.id);
        this.itemid = res.id;
        this.successMessage = "item Added successfully."
        this.store();
      },
      err=>{
        this.hideLoader();
        console.log(err);
        this.errorMessage = err.message;
      })
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
  
    async presentToast() {
      const toast = await this.toastController.create({
        message: this.msg,
        duration: 4000
      });
      toast.present();
    }
}
