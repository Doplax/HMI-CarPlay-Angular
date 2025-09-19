import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { BooksLayoutComponent } from './layout/books-layout.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';

const routes: Routes = [
  {
    path: '',
    //component: BooksLayoutComponent
    component: BooksPageComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallRoutingModule {}
