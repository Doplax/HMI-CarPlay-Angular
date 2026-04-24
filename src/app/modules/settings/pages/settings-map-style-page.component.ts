import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { MapProviderService, MapStyle } from '../services/map-provider.service';
import { SettingsService } from '../services/settings-service.service';

@Component({
  selector: 'settings-map-style-page',
  templateUrl: './settings-map-style-page.component.html',
  styleUrls: ['./settings-map-style-page.component.scss'],
  standalone: false
})
export class SettingsMapStylePageComponent implements OnInit, AfterViewInit {
  @ViewChild('mapPreview') mapPreviewDiv!: ElementRef;

  currentStyle!: MapStyle;
  leafletStyles: MapStyle[] = [];
  mapboxStyles: MapStyle[] = [];
  map?: L.Map;

  mapCenter: [number, number] = [40.4168, -3.7038]; // Madrid
  mapZoom: number = 11;

  constructor(
    private mapProviderService: MapProviderService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentStyle = this.mapProviderService.getStyle();
    this.leafletStyles = this.mapProviderService.getLeafletStyles();
    this.mapboxStyles = this.mapProviderService.getMapboxStyles();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    if (!this.mapPreviewDiv) return;

    this.map = L.map(this.mapPreviewDiv.nativeElement).setView(this.mapCenter, this.mapZoom);
    this.updateMapStyle(this.currentStyle);
  }

  selectStyle(style: MapStyle): void {
    this.currentStyle = style;
    this.updateMapStyle(style);
  }

  private updateMapStyle(style: MapStyle): void {
    if (!this.map) return;

    // Remove existing tile layers
    this.map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        this.map!.removeLayer(layer);
      }
    });

    // Add new tile layer for leaflet styles
    if (style.provider === 'leaflet' && style.tileUrl) {
      L.tileLayer(style.tileUrl, {
        attribution: style.attribution,
        maxZoom: 19
      }).addTo(this.map);
    }
  }

  saveStyle(): void {
    this.mapProviderService.setStyle(this.currentStyle);
    this.router.navigate(['/settings/location']);
  }

  isSelected(style: MapStyle): boolean {
    return this.currentStyle.id === style.id;
  }
}
