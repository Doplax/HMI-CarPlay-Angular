import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { LngLat, Map } from 'mapbox-gl'; // <-- use mapboxgl import
import { environment } from '@environments/environment';

@Component({
    selector: 'maps-page',
    templateUrl: './maps-page.component.html',
    styleUrls: ['./maps-page.component.scss'],
    standalone: false
})
export class MapsPageComponent implements  AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(2.15, 41.5);


  ngAfterViewInit(): void {
    mapboxgl.accessToken = environment.mapbox_key; // <-- always set here

    console.log('environment.mapbox_key', environment.mapbox_key);
    if(!this.divMap) { throw new Error('Map container not found');}

     this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.currentLngLat,
      zoom: this.zoom
    });
    //this.mapListeners();
  }
}
