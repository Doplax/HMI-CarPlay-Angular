import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastPageComponent } from './pages/podcast-page/podcast-page.component';
import { PodcastLayoutComponent } from './layout/podcast-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PodcastLayoutComponent,
    children: [
      {
        path: 'home',
        component: PodcastPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastRoutingModule {}
