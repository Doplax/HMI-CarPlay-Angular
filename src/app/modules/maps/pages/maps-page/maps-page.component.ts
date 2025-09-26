import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import mapboxgl, { LngLat, Map } from 'mapbox-gl'; // <-- use mapboxgl import
import { environment } from '@environments/environment';
import { SettingsService } from '@modules/settings/services/settings-service.service';

@Component({
    selector: 'maps-page',
    templateUrl: './maps-page.component.html',
    styleUrls: ['./maps-page.component.scss'],
    standalone: false
})
export class MapsPageComponent implements  AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat!: LngLat;
  //public currentLngLat: LngLat = new LngLat(2.15, 41.5);


  constructor(
    public settingsService: SettingsService
  ) {}

  async ngAfterViewInit() {
    //mapboxgl.accessToken = environment.mapbox_key;

    //if(!this.divMap) { throw new Error('Map container not found');}

    //await this.settingsService.updateCurrentLocation();
    //const {lat, lng} = this.settingsService.getCoordinates();

    //this.currentLngLat = new LngLat( lng , lat );

    //this.map = new Map({
    //  container: this.divMap.nativeElement,
    //  style: 'mapbox://styles/mapbox/streets-v12',
    //  center: this.currentLngLat,
    //  zoom: this.zoom
    //});
  }
}
