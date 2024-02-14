import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'feed',
        loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'feed/:id',
        loadChildren: () => import('../post-details/post-details.module').then( m => m.PostDetailsPageModule)
      },
      {
        path: 'create-post',
        loadChildren: () => import('../create-post/create-post.module').then( m => m.CreatePostPageModule)
      },
      {
        path: 'recent-post',
        loadChildren: () => import('../recent-post/recent-post.module').then( m => m.RecentPostPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
