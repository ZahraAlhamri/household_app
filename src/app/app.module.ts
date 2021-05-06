import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
//import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
//import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { HttpClientModule } from '@angular/common/http';
import "firebase/firestore";

//firebase.initializeApp(environment.firebaseConfig);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,     AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
