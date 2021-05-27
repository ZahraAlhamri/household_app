import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { FirestoreService } from '../../provider/firestore.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart=[];
  products=[];
  empty=false;
  edit=[];
  newQty=0;
  constructor(private toastController: ToastController, private router: Router, private loadingController: LoadingController ,private firestore: FirestoreService) {

   }

  ngOnInit() {
    this.firestore.getCart(localStorage.getItem('uid')).subscribe(val=>{
      this.cart=[];
      val.forEach(async element => {
        console.log(element.id);
        this.firestore.getItem(element.itemID).snapshotChanges().subscribe(res=>{
          this.products.push(res.payload.data());
        })
          this.cart.push(element);
          this.edit.push(false);
    });
    if(this.cart.length<=0){this.empty=true;}});
  }


  calculatePrice(){
      let totalPrice=0;
      for(let i=0;i<this.cart.length;i++){
        if(this.products[i]){
          totalPrice+=Math.round(Number((this.products[i].price)*this.cart[i].quantity)*10)/10;
          }
      }
      return totalPrice;
    }
    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 2000
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }
    delete(i){
      this.firestore.deleteFromCart(localStorage.getItem('uid'),this.cart[i].id);
      if(i==0){
        this.products.splice(i,i+1);
      }
      else{
        this.products.splice(i,i);
      }
      if(this.cart.length<=0){this.empty=true;}
    }
    details(i){
      this.router.navigateByUrl('item-details/'+this.cart[i].itemID);
    }
    inc(i){
      if(this.newQty==this.products[i].quantity){
        this.presentToast();
      }
      console.log(i);
      if(this.products[i]){
        if(this.newQty<this.products[i].quantity)
          this.newQty++;}
    }
    dec(){
      if(this.newQty>1)
        this.newQty--;
    }
    msave(i){
      if(this.newQty>this.products[i].quantity){
        this.presentToast();
        this.newQty=this.cart[i].quantity}
      else{
      this.firestore.updateCart(localStorage.getItem('uid'),this.cart[i].id,this.cart[i].itemID,this.newQty);
      this.toggleEdit(i);
      }
    }
    toggleEdit(i){
      if(this.edit[i]){
        this.edit[i]=false;
      }
      else{
        this.newQty=this.cart[i].quantity;
        this.edit[i]=true;
      }
    }
    async presentToast() {
      const toast = await this.toastController.create({
        message: 'This quantity is not available',
        duration: 2000
      });
      toast.present();
    }
}
