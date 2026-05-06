import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { environment } from '../../../../environments/environment';
import { MapProviderService, MapStyle } from '../services/map-provider.service';

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

  constructor(private mapProviderService: MapProviderService) {}

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
    this.mapProviderService.setStyle(style);
  }

  private updateMapStyle(style: MapStyle): void {
    if (!this.map) return;

    this.map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        this.map!.removeLayer(layer);
      }
    });

    const tileUrl = this.resolveTileUrl(style);
    if (!tileUrl) return;

    const options: L.TileLayerOptions = {
      attribution: style.attribution,
      maxZoom: 19
    };
    if (style.provider === 'mapbox') {
      options.tileSize = 512;
      options.zoomOffset = -1;
    }
    L.tileLayer(tileUrl, options).addTo(this.map);
  }

  private resolveTileUrl(style: MapStyle): string | null {
    if (style.provider === 'leaflet') {
      return style.tileUrl ?? null;
    }
    if (style.provider === 'mapbox' && style.mapboxStyle) {
      const styleId = style.mapboxStyle.replace('mapbox://styles/', '');
      return `https://api.mapbox.com/styles/v1/${styleId}/tiles/512/{z}/{x}/{y}@2x?access_token=${environment.mapbox_key}`;
    }
    return null;
  }

  isSelected(style: MapStyle): boolean {
    return this.currentStyle.id === style.id;
  }

  getThumbnail(style: MapStyle): string | null {
    if (style.thumbnail) return style.thumbnail;
    if (style.provider === 'mapbox' && style.mapboxStyle) {
      const styleId = style.mapboxStyle.replace('mapbox://styles/', '');
      return `https://api.mapbox.com/styles/v1/${styleId}/tiles/256/4/8/5?access_token=${environment.mapbox_key}`;
    }
    return null;
  }
}
