import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument, 
  DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  items: Observable<any[]>;
  private itemsCollection: AngularFirestoreCollection<Request>;
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
}
