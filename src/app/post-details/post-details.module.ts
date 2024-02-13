import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostDetailsPageRoutingModule } from './post-details-routing.module';

import { PostDetailsPage } from './post-details.page';
import { AppHeaderModule } from '../shared/components/app-header/app-header.module';
import { SinglePostModule } from '../shared/components/single-post/single-post.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDetailsPageRoutingModule,
    AppHeaderModule,
    SinglePostModule
  ],
  declarations: [PostDetailsPage]
})
export class PostDetailsPageModule {}
