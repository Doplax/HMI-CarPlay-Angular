import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicLayoutComponent } from './layout/music-layout.component';
import { MusicHomePageComponent } from './pages/music-home-page/music-home-page.component';
import { MusicNewPageComponent } from './pages/music-new-page/music-new-page.component';
import { MusicRadioPageComponent } from './pages/music-radio-page/music-radio-page.component';
import { MusicLibraryPageComponent } from './pages/music-library-page/music-library-page.component';
import { MusicPlayerPageComponent } from './pages/music-player-page/music-player-page.component';

const routes: Routes = [
  {
    path: '',
    component: MusicLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: MusicHomePageComponent },
      { path: 'new', component: MusicNewPageComponent },
      { path: 'radio', component: MusicRadioPageComponent },
      { path: 'library', component: MusicLibraryPageComponent },
      { path: 'player/:id', component: MusicPlayerPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicRoutingModule {}
