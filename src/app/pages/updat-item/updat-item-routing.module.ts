import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatItemPage } from './updat-item.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatItemPageRoutingModule {}
