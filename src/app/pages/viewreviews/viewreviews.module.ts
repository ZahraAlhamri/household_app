import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewreviewsPageRoutingModule } from './viewreviews-routing.module';

import { ViewreviewsPage } from './viewreviews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewreviewsPageRoutingModule
  ],
  declarations: [ViewreviewsPage]
})
export class ViewreviewsPageModule {}
