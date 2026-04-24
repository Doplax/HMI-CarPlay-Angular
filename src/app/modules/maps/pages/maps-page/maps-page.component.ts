import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { SettingsService } from '@modules/settings/services/settings-service.service';
import { MapProviderService } from '@modules/settings/services/map-provider.service';

@Component({
    selector: 'maps-page',
    templateUrl: './maps-page.component.html',
    styleUrls: ['./maps-page.component.scss'],
    standalone: false
})
export class MapsPageComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;

  public zoom: number = 13;
  public map?: L.Map;

  constructor(
    public settingsService: SettingsService,
    private mapProviderService: MapProviderService
  ) {}

  async ngAfterViewInit() {
    if (!this.divMap) {
      throw new Error('Map container not found');
    }

    await this.settingsService.updateCurrentLocation();
    const { lat, lng } = this.settingsService.getCoordinates();

    this.initializeMap(lat, lng);
  }

  private initializeMap(lat: number, lng: number): void {
    this.map = L.map(this.divMap.nativeElement).setView([lat, lng], this.zoom);

    const style = this.mapProviderService.getStyle();

    if (style.provider === 'leaflet' && style.tileUrl) {
      L.tileLayer(style.tileUrl, {
        attribution: style.attribution,
        maxZoom: 19
      }).addTo(this.map);
    }

    L.marker([lat, lng]).addTo(this.map)
      .bindPopup('Tu ubicación actual')
      .openPopup();
  }
}
