import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicLayoutComponent } from './layout/music-layout.component';
import { MusicRoutingModule } from './music-routing.module'


@NgModule({
  declarations: [
    MusicLayoutComponent
  ],
  imports: [
    CommonModule,
    MusicRoutingModule
  ]
})
export class MusicModule { }
