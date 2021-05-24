import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  public language;
  email;
  msg
  constructor(public toastController : ToastController) { }

  ngOnInit() {
        this.language =localStorage.getItem('language');
  }

  sendEmail(){
    var auth =firebase.auth();
    //var emailAddress = this.email;
    auth.sendPasswordResetEmail(this.email).then(()=>{
      this.msg = "Password reset email sent to your email address. Check your inbox to reset password";
      this.presentToast();
    }).catch(() =>{
      this.msg = "Email not associated to an account or another error occured. Please try again later."
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

}
