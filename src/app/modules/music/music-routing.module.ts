import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { BooksLayoutComponent } from './layout/books-layout.component';
import { MusicLayoutComponent } from './layout/music-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MusicLayoutComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicRoutingModule {}
