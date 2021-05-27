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
  selector: 'app-addreviews',
  templateUrl: './addreviews.page.html',
  styleUrls: ['./addreviews.page.scss'],
})
export class AddreviewsPage implements OnInit {
  reviews=[];
  review;
  rating;
  ratingg;
  counterr;
  newrating;
  reviewid;
  id;
  uid;
  msg: string = '';
  count=0;
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
    firebase //auth
    .firestore() //data
    .doc(`/items/${this.id}`) //login user
    .onSnapshot(userProfileSnapshot => {
      this.ratingg = userProfileSnapshot.data().rating
      this.counterr= userProfileSnapshot.data().counter;
      console.log(userProfileSnapshot.data());    
    });
  }

  addReview(){
    this.count=1+this.counterr;
    this.newrating = (this.ratingg+this.rating)/this.count;
    let rev = {
      review: this.review,
      rating: this.rating,
    }

    this.firestore.addreview(this.id,rev)
    .then((res)=>{
      console.log(res.id);
      this.reviewid = this.id;
      this.successMessage = "review Added successfully.";
        this.firestore.updaterating(this.id,this.newrating,this.count).then((res) => {
          this.msg="the item has been updated successfully";
          this.navCtrl.navigateForward('consumer-home');
    },
    err=>{
      console.log(err);
      this.errorMessage = err.message;
    })
  });
}
}
