import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicLayoutComponent } from './layout/music-layout.component';
import { MusicRoutingModule } from './music-routing.module'
import { SharedModule} from '@shared/shared.module';
import { MusicPageComponent } from './pages/music-page/music-page.component';


@NgModule({
  declarations: [
    MusicLayoutComponent,
    MusicPageComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    SharedModule
  ]
})
export class MusicModule { }
