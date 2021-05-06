import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumerHomePageRoutingModule } from './consumer-home-routing.module';

import { ConsumerHomePage } from './consumer-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsumerHomePageRoutingModule
  ],
  declarations: [ConsumerHomePage]
})
export class ConsumerHomePageModule {}
