import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../post';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent  implements OnInit {
  @Input() post: Post = {body: "", title: "", id: 0, userId: 0}
  @Input() isSinglePost: boolean = false;
  isUpdatePopoverOpen: boolean = false;

  constructor(private router: Router, private location: Location, private postService: PostService) { }

  ngOnInit() {
  }

  onViewDetails(){
    this.router.navigate([`/tabs/feed/${this.post?.id}`]);
  }

  goBack(){
    this.location.back();
  }

  toggleUpdatePostPopover(){
    this.isUpdatePopoverOpen = !this.isUpdatePopoverOpen;
  }
  onUpdatePost(title: any, body: any){
    if(title?.value?.trim() === "" || body?.value?.trim() === ""){
      alert("Title/Post details can not be empty.");
    }else{
      this.toggleUpdatePostPopover();
      this.postService.updateItem(this.post?.id, {title: title.value, body: body.value, userId: 1}).subscribe(res => {
          this.post = res;
          alert("Post has been updated.");
      });
    }
  }

  handleDeleteClick(){
    const confirmation = confirm("Are you certain you want to delete it?");
    if(confirmation){
      this.postService.deleteItem(this.post.id).subscribe(res => {
        alert("Successfully delete.")
        this.goBack();
      });
    }
  }


}
