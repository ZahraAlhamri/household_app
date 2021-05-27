import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddiscountPage } from './adddiscount.page';

const routes: Routes = [
  {
    path: '',
    component: AdddiscountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddiscountPageRoutingModule {}
