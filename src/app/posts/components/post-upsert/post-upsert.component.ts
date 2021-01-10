import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/posts/models';
import { PostsService } from 'src/app/posts/services';

@Component({
  selector: 'app-post-upsert',
  templateUrl: './post-upsert.component.html',
  styleUrls: ['./post-upsert.component.scss']
})
export class PostUpsertComponent implements OnInit {
  isNew: boolean = true;
  post: Post = null;

  constructor(
    private postsService: PostsService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isNew = this.route.snapshot.data['isNew'];
    if (this.isNew){
      this.post = new Post(0, "", "", "");
    }
    else {
      let postId = this.route.snapshot.params['id'] as number;
      this.postsService.getById(postId).subscribe(data => {
        this.post = data;
      });
    }
  }

  onSubmit(){
    if(this.isNew){
      this.postsService.add(this.post).subscribe(() => {
        alert("Saved successfully!!!");
        this.goBack();
      });
    }
    else {
      this.postsService.edit(this.post).subscribe(() => {
        alert("Updated successfully!!!");
        this.goBack();
      });
    }
  }
  
  goBack(){
    this.router.navigate(['/']);
  }
}
