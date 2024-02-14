import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecentPostPage } from './recent-post.page';

const routes: Routes = [
  {
    path: '',
    component: RecentPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecentPostPageRoutingModule {}
