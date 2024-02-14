import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitPost(title: any, body:any){
    if(title?.value?.trim() === "" || body?.value?.trim() === ""){
      alert("Title/Post details can not be empty.")
    }else{
      this.postService.createItem({title: title.value, body: body.value, userId: 1}).subscribe(res => {
          alert("Post has been created. Now, return to the feed page.");
          this.router.navigate(['/tabs/feed']);
      });
    }

  }

}
