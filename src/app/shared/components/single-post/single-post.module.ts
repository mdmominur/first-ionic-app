import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SinglePostComponent } from './single-post.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [SinglePostComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [
    SinglePostComponent
  ]
})
export class SinglePostModule { }
