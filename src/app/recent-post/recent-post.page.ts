import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-recent-post',
  templateUrl: './recent-post.page.html',
  styleUrls: ['./recent-post.page.scss'],
})
export class RecentPostPage implements OnInit {
  postList: any[] = [];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllItems().subscribe(
      (data: any[]) => {
       this.postList = data?.slice(-10);
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  

}
