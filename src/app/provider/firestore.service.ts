import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument, 
  DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  items: Observable<any[]>;
  Fitems: Observable<any[]>;
  cart: Observable<any[]>;
  wishlist: Observable<any[]>;
  BestSelleritems: Observable<any[]>;
  private BestSelleritemsCollection: AngularFirestoreCollection<Request>;
  private wishlistCollection: AngularFirestoreCollection<Request>;
  private itemsCollection: AngularFirestoreCollection<Request>;
  private itemsFCollection: AngularFirestoreCollection<Request>;
  private cartCollection: AngularFirestoreCollection<Request>;
  item: Observable<any[]>;
  private itemCollection: AngularFirestoreCollection<Request>;
  constructor(public db: AngularFirestore) {   }
  registerUserDetails(uid,user){
    console.log('here in user register details ',uid);
    console.log(user);
    return this.db.collection('users').doc(uid).set(user);
  }
  additem(item){
    console.log('item here', item);
    return this.db.collection('items').add(item);
  }
  getItems(){
    this.itemsCollection= this.db.collection<Request>('items')
    this.items= this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.items;
  }
  getFutureItems(){
    this.itemsFCollection= this.db.collection<any>('items', ref=> ref.where('status', '==', 'Future'))
    this.itemsCollection= this.db.collection<Request>('items')
    this.Fitems= this.itemsFCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.Fitems;
  }
  getItem(id){
    console.log(id);
    return this.db.collection<any>('items').doc(id);
  }
  deletItem(id){
    return this.db.collection('items').doc(id).update({"status": "Unavailable"});
  }
  recoveryItem(id){
    return this.db.collection('items').doc(id).update({"status": "Available"});
  }
  updateItem(id,name,type,price,quantity, description,updatedDate){
    return this.db.collection('items').doc(id).update(
      {
        "name" : name,
        "type" : type,
        "price" : price,
        "quantity": quantity,
        "description": description,
        "updatedDate": updatedDate

      }
    );
  }
  addToCart(uid,pid,qty){
    let found=false
    this.getCart(uid).
          subscribe(res=>{res.forEach(item=>{if(!found){
                if(item.itemID==pid){
                  this.db.collection('users').doc(uid).collection('cart').doc(item.id).
                      update({quantity: item.quantity+qty});
                      found=true;
                }}
          });if(!found)
            this.db.collection('users').doc(uid).collection('cart').add({itemID:pid,quantity:qty});})
  }
  getCart(uid){
    this.cartCollection= this.db.collection<Request>('users').doc(uid).collection('cart')
    this.cart= this.cartCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
  }));return this.cart;
}
deleteFromCart(uid,cartItemID){
  return this.db.collection('users').doc(uid).collection('cart').doc(cartItemID).delete();
}
  getWishlist(uid){
    let wishlistCollection= this.db.collection<Request>('users').doc(uid).collection('wishlist')
    this.wishlist= wishlistCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
    }));
    return this.wishlist;
  }
  addToWishlist(uid,pid){
    let found=false
    this.getWishlist(uid).
          subscribe(res=>{res.forEach(item=>{if(!found){
                if(item.itemID==pid){
                      found=true;
                }}
          });if(!found)
            this.db.collection('users').doc(uid).collection('wishlist').add({itemID:pid});})
  }
  deleteFromwishlist(usid,cartItemID){
    return this.db.collection('users').doc(usid).collection('cart').doc(cartItemID).delete();
  }

  getBestItems(){
    this.BestSelleritemsCollection= this.db.collection<any>('items', ref=> ref.where('price', '<=', '2'))
   
    this.BestSelleritems= this.BestSelleritemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.BestSelleritems;
  }
}
