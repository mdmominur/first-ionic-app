import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  postDetails: Post = {title: "", body: "", id: 0, userId: 0};
  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    let id: string | null = this.route.snapshot.paramMap.get('id') || null;
    this.postService.getItemById(id).subscribe(data => {
      this.postDetails = data;
    });
  }

  
}
