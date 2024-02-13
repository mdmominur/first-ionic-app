import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostPageRoutingModule } from './create-post-routing.module';

import { CreatePostPage } from './create-post.page';
import { AppHeaderModule } from '../shared/components/app-header/app-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppHeaderModule,
    CreatePostPageRoutingModule
  ],
  declarations: [CreatePostPage]
})
export class CreatePostPageModule {}
