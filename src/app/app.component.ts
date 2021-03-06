import { Component, OnInit } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from '../app/provider/authentication.service';
import { NavController } from '@ionic/angular';@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public selectedIndex = 0;
  public uType = localStorage.getItem('uType');
  language =localStorage.getItem('language');

/*   public appPages = [
    {
      title: 'Edit Profile',
      url: '/edit-profile',
      icon: 'person'
    }
  ]; */
  message;
  username;
  uid;
  email;

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    private authService: AuthenticationService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    //this.initializeApp();
  }
 logout(){
    console.log('logout');
    
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.authService.removeUserDetails();
      this.message = "Logged out successfully"
      this.presentToast();
      this.navCtrl.navigateRoot('/welcome');
      localStorage.removeUserDetails();
    },
    err=>{
      this.message = "Error logging out. Try again later"
      this.presentToast();
    })
  }

  /* initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  } */

  ngOnInit() {
    this.uType = localStorage.getItem('uType');
    this.uid = localStorage.getItem('uid');
    this.email = localStorage.getItem('email');
    this.language =localStorage.getItem('language');

    this.username = JSON.parse(localStorage.getItem('uDetails')).fname + " " + JSON.parse(localStorage.getItem('uDetails')).lname;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 4000
    });
    toast.present();
  }
}
