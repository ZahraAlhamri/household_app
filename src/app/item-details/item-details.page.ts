import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../provider/firestore.service';
import {ActivatedRoute} from '@angular/router' ;
import 'firebase/auth';
import 'firebase/firestore';
import firebase from 'firebase/app';
import { NavController } from '@ionic/angular';
import { Location } from "@angular/common";

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  id;
  item;
  name;
  type;
  price;
  quantity;
  description;
  photo;
  constructor(public firestore:FirestoreService,public  route: ActivatedRoute, public navCtrl:NavController,private location: Location) {}

  ngOnInit() {
    this.id=this.route.snapshot.paramMap.get('id');
    this.firestore.getItem(this.id).valueChanges().subscribe(
      async item=>{
        this.item = item;   
        this.name=this.item.name; 
        this.type=this.item.type;      
        this.price=this.item.price;      
        this.quantity=this.item.quantity;      
        this.description=this.item.description;   
        this.photo=this.item.photo;   
      });
          
        
  }
}

