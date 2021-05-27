import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestSellerPageRoutingModule } from './best-seller-routing.module';

import { BestSellerPage } from './best-seller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestSellerPageRoutingModule
  ],
  declarations: [BestSellerPage]
})
export class BestSellerPageModule {}
