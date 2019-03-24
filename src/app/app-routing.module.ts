import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'item-info/:id', loadChildren: './pages/item-info/item-info.module#ItemInfoPageModule' },
  { path: 'item-info/:id/:number', loadChildren: './pages/item-info/item-season/item-season.module#ItemSeasonPageModule' },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  // { path: 'favorites-list', loadChildren: './pages/favorites-list/favorites-list.module#FavoritesListPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
