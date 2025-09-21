import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicLayoutComponent } from './layout/music-layout.component';
import { MusicPageComponent } from './pages/music-page/music-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MusicLayoutComponent,
    children: [
      {
        path: 'home',
        component: MusicPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicRoutingModule {}
