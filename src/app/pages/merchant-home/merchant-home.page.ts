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
import { ItemDetailsPageModule } from '../item-details/item-details.module';
interface pRange{
  lower: number,
  upper: number
}
@Component({
  selector: 'app-merchant-home',
  templateUrl: './merchant-home.page.html',
  styleUrls: ['./merchant-home.page.scss'],
})
export class MerchantHomePage implements OnInit {
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
  public originalitems=[];
  public filterIcon="funnel-outline";
  public showFilter=false;
  public filteredList=[];
  public priceRange: pRange={lower:0,upper:0};
  public maxPrice=0;
  public qtyCh=8;
  public qtyWidth='width: '+this.qtyCh+'ch';
  public qtySearch=null;
  items=[];
  segment='Available';
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
              this.originalitems.push(element)
              this.maxPrice=(element.price>this.maxPrice && element.status==this.segment)?element.price:this.maxPrice;
          });this.filteredList={...this.items};this.priceRange.upper=this.maxPrice;
          });
  }
  filter(){
    this.showFilter=(this.showFilter)?false:true;
  }
  saveFilter()
  {
    this.initilizeProducts();
    if(this.qtySearch==null&&this.priceRange.lower==0&&this.priceRange.upper==this.maxPrice){
      this.filterIcon="funnel-outline";
    }
    else{
      this.filterIcon="funnel";
      this.items=(this.qtySearch==null)?this.items: this.items.filter((product)=>{return(product.quantity==this.qtySearch)});
      this.items=this.items.filter((product)=>{return((product.price>=(this.priceRange.lower)) && (product.price<=(this.priceRange.upper)));});
    }
    this.showFilter=false;
    this.filteredList=this.items;
  }
  resetFilter()
  {
    this.initilizeProducts();
    this.qtySearch=null;
    this.priceRange={lower:0,upper:this.maxPrice};
    this.filterIcon="funnel-outline";
    this.showFilter=false;
    this.filteredList=this.items;
  }
  initilizeProducts()
  {
    this.items=this.originalitems;
  }
  searchItems(ev){
    this.items=this.filteredList;
    let v=ev.target.value;
    this.items=this.items.filter((product)=>{return(product.name.toLowerCase().indexOf(v.toLowerCase())>-1);});
  }
  changeSeg(){
    let max=0;
    for(let item of this.items){
      if(item.status==this.segment){
        max=(item.price>max)?item.price:max;
      }
    }
    this.maxPrice=max;
    this.priceRange={lower:0,upper:max};
  }
  incQty(){
    this.qtySearch=(this.qtySearch!=null)?this.qtySearch:0;
    this.qtySearch++;
    this.incWidth()
  }
  decQty(){
    if(this.qtySearch>0){
      this.qtySearch--;
      this.incWidth()
    }
  }
  incWidth(ev=this.qtySearch){
    let v=(ev==this.qtySearch)?this.qtySearch+'': ev.target.value;
    if(v.length<=0){
      this.qtySearch=null;
      this.qtyWidth='width: '+7+'ch';
    }
    else{
      this.qtyCh=v.length+2;
      this.qtyWidth='width: '+this.qtyCh+'ch';
    }
  }
}
