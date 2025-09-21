import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksLayoutComponent } from './layout/books-layout.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', 
    pathMatch: 'full',  
  },
  {
    path: '',
    component: BooksLayoutComponent,
    children: [
      {
        path: 'home',
        component: BooksPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallRoutingModule {}
