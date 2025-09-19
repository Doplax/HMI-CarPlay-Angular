import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { BooksLayoutComponent } from './layout/books-layout.component';
import { CallRoutingModule } from "./books-routing.module";



@NgModule({
  declarations: [
    BooksPageComponent,
    BooksLayoutComponent
  ],
  imports: [
    CommonModule,
    CallRoutingModule
]
})
export class BooksModule { }
