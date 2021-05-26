import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TCPage } from './t-c.page';

const routes: Routes = [
  {
    path: '',
    component: TCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TCPageRoutingModule {}
