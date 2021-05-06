import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument, 
  DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public db: AngularFirestore) { }
  registerUserDetails(uid,user){
    console.log('here in user register details ',uid);
    console.log(user);
    return this.db.collection('users').doc(uid).set(user);
  }
  
}
