//Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

//FoodBlog / Posts Building Blocks
import { SharedModule } from '../shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import {
  PostListComponent,
  PostViewComponent,
  PostUpsertComponent
} from './components';
import {
  PostsService
} from './services';

const COMPONENTS: any[] = [
  PostListComponent,
  PostViewComponent,
  PostUpsertComponent
];
@NgModule({
  declarations: COMPONENTS,
  //exports: COMPONENTS,
  providers: [
    PostsService
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
