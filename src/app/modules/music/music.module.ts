import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicLayoutComponent } from './layout/music-layout.component';
import { MusicRoutingModule } from './music-routing.module';
import { SharedModule } from '@shared/shared.module';

// Pages
import { MusicHomePageComponent } from './pages/music-home-page/music-home-page.component';
import { MusicNewPageComponent } from './pages/music-new-page/music-new-page.component';
import { MusicRadioPageComponent } from './pages/music-radio-page/music-radio-page.component';
import { MusicLibraryPageComponent } from './pages/music-library-page/music-library-page.component';
import { MusicPlayerPageComponent } from './pages/music-player-page/music-player-page.component';

// Components
import { MusicCardComponent } from './components/music-card/music-card.component';

@NgModule({
  declarations: [
    MusicLayoutComponent,
    MusicHomePageComponent,
    MusicNewPageComponent,
    MusicRadioPageComponent,
    MusicLibraryPageComponent,
    MusicPlayerPageComponent,
    MusicCardComponent,
  ],
  imports: [CommonModule, RouterModule, MusicRoutingModule, SharedModule],
})
export class MusicModule {}
