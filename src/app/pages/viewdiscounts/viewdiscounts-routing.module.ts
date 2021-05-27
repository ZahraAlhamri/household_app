import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewdiscountsPage } from './viewdiscounts.page';

const routes: Routes = [
  {
    path: '',
    component: ViewdiscountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewdiscountsPageRoutingModule {}
