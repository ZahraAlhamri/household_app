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
declare var dynamics: any;

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.page.html',
  styleUrls: ['./best-seller.page.scss'],
})
export class BestSellerPage implements OnInit {
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
  Bestitems=[];

  constructor(private firestore: FirestoreService, 
    public navCtrl: NavController, 
    private router: Router, 
    public toastController: ToastController, 
    public alertController: AlertController,) { }

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
      });
      this.firestore.getBestItems().subscribe(val=>{
        this.Bestitems=[];
        val.forEach(async element => {
          this.Bestitems.push(element);
      })
      });

  }
  animation(){
    var elem = document.getElementById("myCard")
      dynamics.animate(elem, {
         translateX: 	350,
         scale:	2,
          opacity: 	0.5
     }, {
         type: 	dynamics.spring,
         frequency: 	200,
         friction: 	200,
         duration: 	1500,
          complete: () => {
      // Stop Animation
       }
    })
    






  }
}
