import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from 'src/app/posts/models';
import { PostsService } from 'src/app/posts/services';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styles: [ `mat-card { margin-top: 10px; }` ]
})
export class PostViewComponent {
  @Input() post: Post;
  @Output() postDeleted = new EventEmitter<number>();

  constructor(
    private postsService: PostsService
  ) {}

  deletePost(){
    let confirmDelete = window.confirm(`Are you sure you want to remove post with title '${this.post.Title}'?`);
    if (confirmDelete){
      this.postsService.delete(this.post.Id).subscribe(() => {
        window.alert("Deleted successfully!!!");
        this.postDeleted.emit(this.post.Id);
      });
    }
  }
}
