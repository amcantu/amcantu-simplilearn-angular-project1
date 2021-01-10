import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services';
import { Post } from '../../models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  posts: Post[];
  
  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(data => {
      this.posts = data;
    });
  }

  postDeleted(postId: number){
    let indexOfDeletedPost = this.posts.findIndex(x=> x.Id == postId);
    this.posts.splice(indexOfDeletedPost, 1);
  }
}
