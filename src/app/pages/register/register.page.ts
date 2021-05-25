import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, ToastController, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/provider/firestore.service';
import { AuthenticationService } from 'src/app/provider/authentication.service';
//import { ElementFinder } from 'protractor';
//import { auth } from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loaderToShow: any;
  number = 0;
  public uimage = "../../../assets/images/uimage.png";
  public uploadfile;
  public filename;
  private message;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be 8 digits' },
      { type: 'maxlength', message: 'Password must be 8 digits' }
    ],
    'fname': [
      { type: 'required', message: 'Name is required'},
      { type: 'pattern' , message: 'Name must contain alphabet only'}
    ],
    'lname': [
      { type: 'required', message: 'Name is required'},
      { type: 'pattern' , message: 'Name must contain alphabet only'}
   ],
    'phone': [
     { type: 'required', message: 'Phone number is required'},
     { type: 'pattern' , message: 'Enter a valid phone number'},
     { type: 'minlength', message: 'Phone number must be 8 digits'},
     { type: 'maxlength', message: 'Phone number must be 8 digits'}
   ],
     'gender': [
     { type: 'required' , message: 'Gender is required'}
    ],
    'country': [
      { type: 'required', message: 'Name is required'},
      { type: 'pattern' , message: 'Name must contain alphabet only'}
    ],
  };

  constructor(  private activatedRoute: ActivatedRoute,
    private navCtrl: NavController, 
    private authService: AuthenticationService, 
    private formBuilder: FormBuilder, 
    private firestore: FirestoreService, 
    private loader: LoadingController,
    private alert: AlertController,
    private menuCtrl: MenuController,
    public toastController: ToastController) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^([a-zA-Z0-9@*#_-]{8,})$'),
      ])),
      fname: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z][" "a-zA-Z]*[a-zA-Z]$'),
        Validators.required
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z][" "a-zA-Z]*[a-zA-Z]$'),
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.required,
        Validators.pattern('^[1,3][0-9]{7}$')
      ])),
      gender: new FormControl('', Validators.compose([
        Validators.required
      ])),
      country: new FormControl('', Validators.compose([
        Validators.pattern('^[a-zA-Z][" "a-zA-Z]*[a-zA-Z]$'),
        Validators.required
      ])),
    });
  }
  HandleFileSelect(evt){
    if(evt.target.files && evt.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.uimage = event.target.result;
      }
      reader.readAsDataURL(evt.target.files[0]);
    }
      let fileList: FileList = evt.target.files;  
      let file: File = fileList[0];
      console.log(file);
      this.uploadfile = evt.target.files[0];
      this.filename = evt.target.files[0].name;
  }
  store(id){
    let name;
    name = id;
    console.log(name);
   var imageRef = firebase.storage().ref().child("uprofilepic/"+name);
    imageRef.put(this.uploadfile).then(
      res=>{
        imageRef.getDownloadURL().then(
          image=>{
            console.log(image);
            firebase
            .firestore()
            .doc(`/users/${id}`).update({
              photo:image
            })
          }
        )
      } 
    )
    this.hideLoader();
    this.presentToast();
    this.navCtrl.navigateForward('/login');
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 4000
    });
    toast.present();
  }
  tryRegister(user){
    this.showLoader();

      let authenticate = { 
        email: user.email, 
        password: user.password 
      };
  
      let details = {
        fname: user.fname,
        lname: user.lname,
        gender: user.gender,
        uType: 'Consumer',
        phone: user.phone,
        email: user.email,
        address: "",
        language:"English",
        country: user.country
      }
  
     this.authService.registerUser(authenticate)
      .then((success)=>{
        console.log(success.user.uid);
        this.firestore.registerUserDetails(success.user.uid, details)
        .then((res)=>{
          this.message = "Account registered successfully."
          this.store(success.user.uid)
        },
        err=>{
          this.authService.deleteUser().then((success)=>{
            this.hideLoader();
            this.message = err.message;
            this.presentToast();
          })
        })
      },
      err =>{
        this.hideLoader();
        this.message = err.message;
        this.presentToast();
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
 
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
}

