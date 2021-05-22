import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemDetailsPageRoutingModule } from './item-details-routing.module';

import { ItemDetailsPage } from './item-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ItemDetailsPage]
})
export class ItemDetailsPageModule {}
