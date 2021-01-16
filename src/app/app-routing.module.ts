import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    path: 'posts', 
    loadChildren: () => import(`./posts/posts.module`).then(m => m.PostsModule) 
  },    
  { 
    path: 'contact', 
    loadChildren: () => import(`./contact/contact.module`).then(m => m.ContactModule) 
  },    
  { 
    path: '',   
    redirectTo: '/posts/list', // redirect to Posts Module
    pathMatch: 'full' 
  }, 
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page  
  { 
    path: '**', 
    redirectTo: '/posts/list' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
