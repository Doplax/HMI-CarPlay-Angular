import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsPageComponent } from './pages/maps-page/maps-page.component';
import { MapsRoutingModule } from './maps-routing.module';

//MapBox GL
//import mapboxgl from 'mapbox-gl';
//import { environment } from '@environments/environment';
//mapboxgl.accessToken = environment.mapbox_key;

@NgModule({
  declarations: [
    MapsPageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
