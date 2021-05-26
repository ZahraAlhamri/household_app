import { LoadingController } from '@ionic/angular';
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
  constructor(private loadingController: LoadingController ,private firestore: FirestoreService) {

   }

  ngOnInit() {
    this.presentLoading();
    this.firestore.getCart(localStorage.getItem('uid')).subscribe(val=>{
      this.cart=[];
      val.forEach(async element => {
        this.firestore.getItem(element.itemID).snapshotChanges().subscribe(res=>{
          this.products.push(res.payload.data());
        })
        if(!this.checkSameItem(element)){
          this.cart.push(element);
        }
    });
    this.loadingController.dismiss();
    if(this.cart.length<=0){this.empty=true;}});
  }

  checkSameItem(elem){
    for(let i=0;i<this.cart.length;i++){
      if(this.cart[i].itemID==elem.itemID){
        this.cart[i].quantity+=elem.quantity;
        if(this.products[i]&&this.products[i].quantity<this.cart[i].quantity){
          this.cart[i].quantity=this.products[i].quantity;
        }
        return true;
      }
    return false;
    }
  }

  calculatePrice(){
      let totalPrice=0;
      for(let i=0;i<this.cart.length;i++){
        if(this.products[i]){
          totalPrice+=Number(this.products[i].price)*this.cart[i].quantity
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
      if(i==0){
        this.products.splice(i,i+1);
        this.cart.splice(i,i+1);
      }
      else{
        this.products.splice(i,i);
        this.cart.splice(i,i);
        console.log(this.cart[i]+''+this.products[i])
      }
      if(this.cart.length<=0){this.empty=true;}
    }

}
