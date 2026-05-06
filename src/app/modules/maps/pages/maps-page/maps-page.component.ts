import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { SettingsService } from '@modules/settings/services/settings-service.service';
import { MapProviderService } from '@modules/settings/services/map-provider.service';

@Component({
    selector: 'maps-page',
    templateUrl: './maps-page.component.html',
    styleUrls: ['./maps-page.component.scss'],
    standalone: false
})
export class MapsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap!: ElementRef<HTMLDivElement>;

  public zoom: number = 16;
  public map?: L.Map;
  public is3dActive = false;

  private locationMarker?: L.Marker;
  private geoWatchId?: number;
  private currentHeading = 0;

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
    this.startTrackingLocation();
  }

  ngOnDestroy(): void {
    if (this.geoWatchId !== undefined) {
      navigator.geolocation.clearWatch(this.geoWatchId);
    }
    this.map?.remove();
  }

  onRecenter(): void {
    if (!this.map) return;
    const { lat, lng } = this.settingsService.getCoordinates();
    this.map.setView([lat, lng], this.zoom, { animate: true });
  }

  onZoomIn(): void {
    this.map?.zoomIn();
  }

  onZoomOut(): void {
    this.map?.zoomOut();
  }

  onToggle3d(): void {
    this.is3dActive = !this.is3dActive;
    const el = this.divMap?.nativeElement;
    if (!el) return;
    if (this.is3dActive) {
      el.style.transform = 'perspective(1200px) rotateX(45deg)';
      el.style.transformOrigin = 'center 65%';
    } else {
      el.style.transform = '';
      el.style.transformOrigin = '';
    }
    setTimeout(() => this.map?.invalidateSize(), 0);
  }

  private initializeMap(lat: number, lng: number): void {
    this.map = L.map(this.divMap.nativeElement, {
      zoomControl: false,
    }).setView([lat, lng], this.zoom);

    const style = this.mapProviderService.getStyle();
    const tileUrl =
      style.provider === 'leaflet' && style.tileUrl
        ? style.tileUrl
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      attribution: style.attribution,
      maxZoom: 19,
    }).addTo(this.map);

    this.locationMarker = L.marker([lat, lng], {
      icon: this.buildNavigationIcon(this.currentHeading),
      interactive: false,
      keyboard: false,
    }).addTo(this.map);
  }

  private startTrackingLocation(): void {
    if (!('geolocation' in navigator)) return;

    this.geoWatchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading } = position.coords;
        if (typeof heading === 'number' && !Number.isNaN(heading)) {
          this.currentHeading = heading;
        }
        this.settingsService.setCoordinates(latitude, longitude);
        this.updateLocationMarker(latitude, longitude);
      },
      undefined,
      { enableHighAccuracy: true, maximumAge: 1000 },
    );
  }

  private updateLocationMarker(lat: number, lng: number): void {
    if (!this.map || !this.locationMarker) return;
    const latLng = L.latLng(lat, lng);
    this.locationMarker.setLatLng(latLng);
    this.locationMarker.setIcon(this.buildNavigationIcon(this.currentHeading));
  }

  private buildNavigationIcon(heading: number): L.DivIcon {
    const html = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
           style="width:100%;height:100%;transform:rotate(${heading}deg);filter:drop-shadow(0 2px 4px rgba(0,0,0,0.45));">
        <path d="M12 2 L20 22 L12 17 L4 22 Z"
              fill="#1a73e8"
              stroke="#ffffff"
              stroke-width="1.5"
              stroke-linejoin="round"/>
      </svg>
    `;
    return L.divIcon({
      html,
      className: 'navigation-marker-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }
}
