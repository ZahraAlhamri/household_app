import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TCPageRoutingModule } from './t-c-routing.module';

import { TCPage } from './t-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TCPageRoutingModule
  ],
  declarations: [TCPage]
})
export class TCPageModule {}
