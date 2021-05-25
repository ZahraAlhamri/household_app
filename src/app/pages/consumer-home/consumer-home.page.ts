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
interface pRange{
  lower: number,
  upper: number
}
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
  public categoryFilter="";
  public filterIcon="funnel-outline";
  public showFilter=false;
  public filteredList=[];
  public originalitems=[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  public priceRange: pRange={lower:0,upper:1000};
  items=[];
  public maxPrice=0;


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
              this.originalitems.push(element);
              this.maxPrice=(element.price>this.maxPrice)?element.price:this.maxPrice;
          });this.filteredList=this.items;this.priceRange.upper=this.maxPrice;
          });
  }
  getItems(ev: any){
    this.items=this.filteredList;
    let v=ev.target.value;
    this.items=this.items.filter((product)=>{return(product.name.toLowerCase().indexOf(v.toLowerCase())>-1);});
  }
  filter(){
    this.showFilter=(this.showFilter)?false:true;
  }
  saveFilter()
  {
    this.initilizeProducts();
    if(this.priceRange.upper==this.maxPrice && this.priceRange.lower==this.maxPrice && this.categoryFilter==''){
      this.filterIcon="funnel-outline";
    }
    else{
    this.filterIcon="funnel";
    }
    let v=this.categoryFilter;
    //this.items=this.items.filter((product)=>{return(product.category.toLowerCase().indexOf(v.toLowerCase())>-1);});
    this.items=this.items.filter((product)=>{return((product.price>=(this.priceRange.lower)) && (product.price<=(this.priceRange.upper)));});
    this.showFilter=false;
    this.filteredList=this.items;
  }
  resetFilter()
  {
    this.initilizeProducts();
    this.categoryFilter="";
    this.priceRange={lower:0,upper:this.maxPrice};
    this.filterIcon="funnel-outline";
    this.showFilter=false;
    this.filteredList=this.items;
  }
  initilizeProducts()
  {
    this.items=this.originalitems ;
  }

}
