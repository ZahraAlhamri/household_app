import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewreviewsPage } from './viewreviews.page';

const routes: Routes = [
  {
    path: '',
    component: ViewreviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewreviewsPageRoutingModule {}
