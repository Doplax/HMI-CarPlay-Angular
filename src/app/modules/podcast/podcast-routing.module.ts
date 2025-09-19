import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastPageComponent } from './pages/podcast-page/podcast-page.component';

const routes: Routes = [
  {
    path: '',
    component: PodcastPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PodcastRoutingModule {}
