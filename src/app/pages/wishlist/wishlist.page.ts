import { FirestoreService } from 'src/app/provider/firestore.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  public wishlist = [];
  public empty = false;
  products=[];
  constructor(private loadingController: LoadingController ,private firestore: FirestoreService) { }

  ngOnInit() {
    //this.presentLoading();
    this.firestore.getWishlist(localStorage.getItem('uid')).subscribe(val=>{
      this.wishlist=[];
      val.forEach(async element => {
        console.log(element.id);
        this.firestore.getItem(element.itemID).snapshotChanges().subscribe(res=>{
          this.products.push(res.payload.data());
        })
          this.wishlist.push(element);
    });
   // this.loadingController.dismiss();
    if(this.wishlist.length<=0){this.empty=true;}
  });
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
    console.log(localStorage.getItem('uid')+'  '+this.wishlist[i].id)
    this.firestore.deleteFromwishlist(localStorage.getItem('uid'),this.wishlist[i].id);
    if(i==0){
      this.products.splice(i,i+1);
      this.wishlist.splice(i,i+1);
    }
    else{
      this.products.splice(i,i);
      this.wishlist.splice(i,i);
      console.log(this.wishlist[i]+''+this.products[i])
    }
    if(this.wishlist.length<=0){this.empty=true;}
  }

}
