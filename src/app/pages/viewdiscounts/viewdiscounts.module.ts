import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewdiscountsPageRoutingModule } from './viewdiscounts-routing.module';

import { ViewdiscountsPage } from './viewdiscounts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewdiscountsPageRoutingModule
  ],
  declarations: [ViewdiscountsPage]
})
export class ViewdiscountsPageModule {}
