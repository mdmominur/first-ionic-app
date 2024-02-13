import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent  implements OnInit {
  @Input() post: Post = {body: "", title: "", id: 0, userId: 0}
  @Input() isSinglePost: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onViewDetails(){
    this.router.navigate([`/tabs/feed/${this.post?.id}`]);
  }

  goBack(){
    this.router.navigate([`/tabs/feed`]);
  }


}
