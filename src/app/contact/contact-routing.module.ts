import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

const routes: Routes = [
  { 
    path: 'form', 
    component: ContactFormComponent 
  },
  { 
    path: '', 
    redirectTo: 'form',
    pathMatch: 'prefix'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
