import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostUpsertComponent } from './components/post-upsert/post-upsert.component';

const routes: Routes = [
  { 
    path: 'list', 
    component: PostListComponent 
  },
  { 
    path: 'add', 
    component: PostUpsertComponent, 
    data: {
      isNew: true
    } 
  },
  { 
    path: 'edit/:id', 
    component: PostUpsertComponent, 
    data: {
      isNew: false
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
