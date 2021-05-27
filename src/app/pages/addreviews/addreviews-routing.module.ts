import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddreviewsPage } from './addreviews.page';

const routes: Routes = [
  {
    path: '',
    component: AddreviewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddreviewsPageRoutingModule {}
