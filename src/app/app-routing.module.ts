import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'consumer-home',
    loadChildren: () => import('./pages/consumer-home/consumer-home.module').then( m => m.ConsumerHomePageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./pages/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'merchant-home',
    loadChildren: () => import('./pages/merchant-home/merchant-home.module').then( m => m.MerchantHomePageModule)
  },
  {
    path: 'add-item',
    loadChildren: () => import('./pages/add-item/add-item.module').then( m => m.AddItemPageModule)
  },
  {
    path: 'updat-item',
    loadChildren: () => import('./pages/updat-item/updat-item.module').then( m => m.UpdatItemPageModule)
  },
  {
    path: 'item-details/:id',
    loadChildren: () => import('./pages/item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'addreviews/:id',
    loadChildren: () => import('./pages/addreviews/addreviews.module').then( m => m.AddreviewsPageModule)
  },
  {
    path: 'viewreviews/:id',
    loadChildren: () => import('./pages/viewreviews/viewreviews.module').then( m => m.ViewreviewsPageModule)
  },
  {
    path: 'adddiscount/:id',
    loadChildren: () => import('./pages/adddiscount/adddiscount.module').then( m => m.AdddiscountPageModule)
  },
  {
    path: 'viewdiscounts',
    loadChildren: () => import('./pages/viewdiscounts/viewdiscounts.module').then( m => m.ViewdiscountsPageModule)
  },
{
    path: 'future',
    loadChildren: () => import('./pages/future/future.module').then( m => m.FuturePageModule)
  },
  {
    path: 'best-seller',
    loadChildren: () => import('./pages/best-seller/best-seller.module').then( m => m.BestSellerPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./pages/statistics/statistics.module').then( m => m.StatisticsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
