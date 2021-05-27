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
import { Router, NavigationExtras } from '@angular/router';
import { ElementFinder } from 'protractor';
//import { auth } from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-adddiscount',
  templateUrl: './adddiscount.page.html',
  styleUrls: ['./adddiscount.page.scss'],
})
export class AdddiscountPage implements OnInit{

  perecntage;
  duration;
  perecntagee;
  durationn;
  id;
  uid;
  msg: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private activatedRoute: ActivatedRoute,
    private navCtrl: NavController, 
    private authService: AuthenticationService, 
    private firestore: FirestoreService, 
    private loader: LoadingController,
    private alert: AlertController,
    private menuCtrl: MenuController,
    public ModalCtrl:ModalController,
    public toastController: ToastController, 
    public  route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    this.uid = localStorage.getItem("uid");
  }

  addDiscount(){
    this.firestore.updatediscount(this.id,this.perecntage, this.duration)
    .then((res) => {
      this.successMessage = "Discount Added successfully.";
          this.navCtrl.navigateForward('merchant-home');
    },
    err=>{
      console.log(err);
      this.errorMessage = err.message;
    })
  };
}

