import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatItemPageRoutingModule } from './updat-item-routing.module';

import { UpdatItemPage } from './updat-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatItemPageRoutingModule
  ],
  declarations: [UpdatItemPage]
})
export class UpdatItemPageModule {}
