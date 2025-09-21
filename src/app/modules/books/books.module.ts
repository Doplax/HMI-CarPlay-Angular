import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallRoutingModule } from "./books-routing.module";
import { SharedModule} from '@shared/shared.module';

// Components
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { BooksLayoutComponent } from './layout/books-layout.component';

@NgModule({
  declarations: [
    BooksPageComponent,
    BooksLayoutComponent
  ],
  imports: [
    CommonModule,
    CallRoutingModule,
    SharedModule
]
})
export class BooksModule { }
