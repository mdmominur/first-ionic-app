import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecentPostPageRoutingModule } from './recent-post-routing.module';

import { RecentPostPage } from './recent-post.page';
import { AppHeaderModule } from '../shared/components/app-header/app-header.module';
import { SinglePostModule } from '../shared/components/single-post/single-post.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecentPostPageRoutingModule,
    AppHeaderModule,
    SinglePostModule
  ],
  declarations: [RecentPostPage]
})
export class RecentPostPageModule {}
