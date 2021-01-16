//Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Plugin Modules
import { NgxWigModule } from 'ngx-wig';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    
    //Angular
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //Angular Material + Plugins
    NgxWigModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule
  ],
  exports: [
    //Angular
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    //Angular Material + Plugins
    NgxWigModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatToolbarModule
  ]
})
export class SharedModule { }
