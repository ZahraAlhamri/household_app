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
  selector: 'app-future',
  templateUrl: './future.page.html',
  styleUrls: ['./future.page.scss'],
})
export class FuturePage implements OnInit {
items;
  constructor(private firestore: FirestoreService,
    public navCtrl: NavController,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController, )
    { }

  ngOnInit() {
    this.firestore.getFutureItems().subscribe(val=>{
      this.items=[];
      val.forEach(async element => {
        this.items.push(element);
    });
    });
  }
}
