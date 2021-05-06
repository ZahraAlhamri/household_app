import { Injectable } from '@angular/core';
//import * as firebase from 'firebase/app';
import { FirestoreService } from '../../app/provider/firestore.service';
import 'firebase/auth';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afs: FirestoreService) { }
  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }
  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          //resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
  deleteUser(){
    return firebase.auth().currentUser.delete();
  } 
  userDetails(){
    return firebase.auth().currentUser;
  }
  removeUserDetails(){
    localStorage.clear();
  }
}
