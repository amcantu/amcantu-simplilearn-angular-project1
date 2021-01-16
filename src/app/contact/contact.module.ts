//Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'

//FoodBlog / Posts Building Blocks
import { SharedModule } from '../shared.module';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactMessagesService } from './services';

@NgModule({
  declarations: [
    ContactFormComponent
  ],
  providers: [
    ContactMessagesService
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
