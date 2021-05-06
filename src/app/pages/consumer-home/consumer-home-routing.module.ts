import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumerHomePage } from './consumer-home.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumerHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumerHomePageRoutingModule {}
