import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirestoreService } from '../../provider/firestore.service';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { AuthenticationService } from '../../provider/authentication.service';
import { FirebaseApp } from '@angular/fire';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-consumer-home',
  templateUrl: './consumer-home.page.html',
  styleUrls: ['./consumer-home.page.scss'],
})
export class ConsumerHomePage implements OnInit {
  public uid;
  public email;
  public name;
  public fname; 
  public lname; 
  public gender; 
  public Dcategory;
  public phone;
  public category;
  public uploadfile: File;
  public filename;
  public uimage = "../../../assets/images/uimage.png";
  public role;
  public address;
  public country;
  items=[];

  constructor(private firestore: FirestoreService, 
              public navCtrl: NavController, 
              private router: Router, 
              public toastController: ToastController, 
              public alertController: AlertController, ) 
              { }
  ngOnInit() {
    this.uid = localStorage.getItem('uid');
        firebase 
          .firestore()
          .doc(`/users/${this.uid}`)
          .onSnapshot(userProfileSnapshot => {
            this.fname = userProfileSnapshot.data().fname
            this.lname= userProfileSnapshot.data().lname;
            this.name = userProfileSnapshot.data().name;
            this.gender = userProfileSnapshot.data().gender;
            this.phone = userProfileSnapshot.data().phone;
            this.role= userProfileSnapshot.data().uType;
            this.uimage= userProfileSnapshot.data().photo;
            this.address= userProfileSnapshot.data().address;
            this.country = userProfileSnapshot.data().country;
            console.log(userProfileSnapshot.data()); 
            localStorage.setItem('uDetails',JSON.stringify(userProfileSnapshot.data()))
            localStorage.setItem('uType',userProfileSnapshot.data().uType);   
            localStorage.setItem('language',userProfileSnapshot.data().language);       
          });
          this.firestore.getItems().subscribe(val=>{
            this.items=[];
            val.forEach(async element => {
              this.items.push(element);
          })
          });
  }
  slideOpts= {
    loop: true,
    autoplay: {
      delay: 1000
      }
  };
  offers = ['1.png','2.png', '3.png', '4.png', '5.png','6.png'];
  slidesDidLoad(slides:IonSlides) {
    slides.startAutoplay();
  }

 
}
