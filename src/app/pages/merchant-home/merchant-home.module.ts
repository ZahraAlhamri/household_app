import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MerchantHomePageRoutingModule } from './merchant-home-routing.module';

import { MerchantHomePage } from './merchant-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MerchantHomePageRoutingModule
  ],
  declarations: [MerchantHomePage]
})
export class MerchantHomePageModule {}
