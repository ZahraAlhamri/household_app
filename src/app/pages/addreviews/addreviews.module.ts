import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddreviewsPageRoutingModule } from './addreviews-routing.module';

import { AddreviewsPage } from './addreviews.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddreviewsPageRoutingModule
  ],
  declarations: [AddreviewsPage]
})
export class AddreviewsPageModule {}
