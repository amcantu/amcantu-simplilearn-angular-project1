//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

//FoodBlog App Modules
import { SharedModule } from './shared.module';
import { PostsModule } from './posts/posts.module';
import { ContactModule } from './contact/contact.module';
import { AppRoutingModule } from './app-routing.module';

//FoodBlog Building Blocks
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  

    AppRoutingModule,
    SharedModule,
    PostsModule,
    ContactModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
