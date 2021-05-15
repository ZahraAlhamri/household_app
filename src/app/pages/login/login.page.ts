import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../provider/firestore.service';
import { AuthenticationService } from '../../provider/authentication.service';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  loaderToShow: any;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Password must be atleast 8 digits long' },
      { type: 'pattern', message: 'Password must start with a letter and can only have letters, numbers and @_-*#' }
    ]
  };

  constructor(public menuCtrl: MenuController, private navCtrl: NavController, private authService: AuthenticationService, private formBuilder: FormBuilder, public loader: LoadingController, private afs: FirestoreService, public toastController: ToastController) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        //Validators.minLength(8),
        Validators.pattern('^([a-zA-Z0-9@*#_-]{6,})$'),
        Validators.required
      ])),
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }
  loginUser(value){
    this.showLoader();
    this.authService.loginUser(value)
    .then(res => {
      //console.log(res);
      this.errorMessage = ""; 
      let uid = this.authService.userDetails().uid;
      //console.log("login page",uid);
      let email = this.authService.userDetails().email;
      localStorage.setItem('uid', uid);
      localStorage.setItem('email', email);
      firebase
        .firestore()
        .doc(`/users/${uid}`)
        .onSnapshot(userProfileSnapshot => {
          this.successMessage = "Logged in successfully.";
          this.presentSuccessToast();
          //console.log(userProfileSnapshot.data()); 
          localStorage.setItem('uDetails',JSON.stringify(userProfileSnapshot.data()))
          localStorage.setItem('uType',userProfileSnapshot.data().uType);
          if(userProfileSnapshot.data().uType == 'Consumer'){
            this.hideLoader();
            this.navCtrl.navigateForward('consumer-home');
          }
          else if(userProfileSnapshot.data().uType == 'Merchant'){
            this.hideLoader();
            this.navCtrl.navigateForward('/merchant-home');
          }
        });
    }, err => {
      if(err.code == "auth/user-not-found")
        this.errorMessage = "Email not registered to any account. Please check your email or register a new account.";
      else 
        this.errorMessage = err.message;
      this.hideLoader();
      this.presentErrorToast();
      console.log('error here',err);
    });
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

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      duration: 4000
    });
    toast.present();
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: this.successMessage,
      duration: 4000
    });
    toast.present();
  }
}
