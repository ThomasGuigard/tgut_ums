import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movies-list',
        children: [
          {
            path: '',
            loadChildren: '../pages/movies-list/movies-list.module#MoviesListPageModule',
            
          }
        ]
      },
      {
        path: 'tvshows-list',
        children: [
          {
            path: '',
            loadChildren: '../pages/tvshows-list/tvshows-list.module#TvshowsListPageModule',

          }
        ]
      },
      {
        path: 'favorites-list',
        children: [
          {
            path: '',
            loadChildren: '../pages/favorites-list/favorites-list.module#FavoritesListPageModule'
          }
        ]
      },
      {
        path: 'tabs',
        redirectTo: '/tabs/movies-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tabs',
    redirectTo: '/tabs/movies-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
