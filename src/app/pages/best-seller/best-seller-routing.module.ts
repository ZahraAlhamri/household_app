import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BestSellerPage } from './best-seller.page';

const routes: Routes = [
  {
    path: '',
    component: BestSellerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BestSellerPageRoutingModule {}
