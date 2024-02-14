import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-post',
  templateUrl: './recent-post.page.html',
  styleUrls: ['./recent-post.page.scss'],
})
export class RecentPostPage implements OnInit {
  postList: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
