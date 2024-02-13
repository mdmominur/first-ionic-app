import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';
import { AppHeaderModule } from '../shared/components/app-header/app-header.module';
import { SinglePostModule } from '../shared/components/single-post/single-post.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedPageRoutingModule,
    AppHeaderModule,
    SinglePostModule
  ],
  declarations: [FeedPage]
})
export class FeedPageModule {}
