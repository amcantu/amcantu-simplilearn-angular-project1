//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

//FoodBlog App Modules
import { SharedModule } from './shared.module';
import { PostsModule } from './posts/posts.module';
import { AppRoutingModule } from './app-routing.module';

//FoodBlog Building Blocks
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  

    AppRoutingModule,
    SharedModule,
    PostsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
