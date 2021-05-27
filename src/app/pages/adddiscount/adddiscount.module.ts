import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddiscountPageRoutingModule } from './adddiscount-routing.module';

import { AdddiscountPage } from './adddiscount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddiscountPageRoutingModule
  ],
  declarations: [AdddiscountPage]
})
export class AdddiscountPageModule {}
