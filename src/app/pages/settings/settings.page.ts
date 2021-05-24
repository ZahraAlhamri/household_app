import { Component, OnInit } from '@angular/core';
import { LoadingController,NavController  } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public language;
  uid;
  role;
  loaderToShow: any;
  errorMessage: string = '';
  successMessage: string = '';
  constructor(
    private navCtrl: NavController, 
    private loader: LoadingController,
    public toastController: ToastController) {}

  ngOnInit() {
    this.uid = localStorage.getItem('uid');
    this.role = localStorage.getItem('uType');
    //this.language =localStorage.getItem('language');
  
        firebase //auth
          .firestore() //data
          .doc(`/users/${this.uid}`) //login user
          .onSnapshot(userProfileSnapshot => {
            this.language = userProfileSnapshot.data().language;
            localStorage.setItem('uDetails',JSON.stringify(userProfileSnapshot.data()))
            localStorage.setItem('uType',userProfileSnapshot.data().uType);  
            localStorage.setItem('language',userProfileSnapshot.data().language);        
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
  async UpdatedAlert() {
    const toast = await this.toastController.create({
      message:  " Updated Successfully",
      duration: 4000
    });
    toast.present();
    if(this.role == 'Consumer')
      this.navCtrl.navigateForward('/consumer-home');
    if(this.role == 'merchant')
      this.navCtrl.navigateForward('/merchant-home');
  }
  Save() {
    this.showLoader();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {   
        firebase
          .firestore()
          .doc(`/users/${this.uid}`).update({
            language:this.language,
          }).then(() => {
            localStorage.setItem('language',this.language);        
            this.hideLoader();
            this.UpdatedAlert();
          },err=>{
            this.hideLoader();
            this.errorMessage = err.message;
          })
      }
    })
  }
}
