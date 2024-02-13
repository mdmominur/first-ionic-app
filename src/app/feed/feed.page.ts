import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  mainPosts: any[] = [];
  currentPage = 1;
  postsPerPage = 10;
  totalPages: number = 0;

  postList: Post[] = [{body: "", title: "", id: 0, userId: 0}];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.fetchPosts();
  }


  fetchPosts() {
    console.log(this.mainPosts);
    
    if(this.mainPosts?.length === 0){
      this.postService.getAllItems().subscribe(
        (data: any[]) => {
          this.setPostDetails(data);
          this.mainPosts = data;
        },
        error => {
          console.error('Error fetching posts:', error);
        }
      );
    }else{
      this.setPostDetails(this.mainPosts);
    }
    
  }

  setPostDetails(data: Post[]){
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.totalPages = Math.ceil(data.length / this.postsPerPage);
    this.postList = data.slice(startIndex, startIndex + this.postsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchPosts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPosts();
    }
  }

}
