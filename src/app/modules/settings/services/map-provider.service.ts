import { Injectable } from '@angular/core';

export type MapProvider = 'leaflet' | 'mapbox';

export interface MapStyle {
  id: string;
  name: string;
  provider: MapProvider;
  tileUrl?: string;
  mapboxStyle?: string;
  attribution: string;
  thumbnail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapProviderService {
  private readonly STYLE_KEY = 'map-style-id';
  private readonly DEFAULT_STYLE_ID = 'osm-standard';

  private readonly AVAILABLE_STYLES: MapStyle[] = [
    {
      id: 'osm-standard',
      name: 'OpenStreetMap Standard',
      provider: 'leaflet',
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors',
      thumbnail: 'https://tile.openstreetmap.org/4/8/5.png'
    },
    {
      id: 'osm-hot',
      name: 'OpenStreetMap HOT',
      provider: 'leaflet',
      tileUrl: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors, © HOT',
      thumbnail: 'https://a.tile.openstreetmap.fr/hot/4/8/5.png'
    },
    {
      id: 'cartodb-light',
      name: 'CartoDB Light',
      provider: 'leaflet',
      tileUrl: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      attribution: '© CartoDB © OpenStreetMap contributors',
      thumbnail: 'https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/4/8/5.png'
    },
    {
      id: 'cartodb-dark',
      name: 'CartoDB Dark',
      provider: 'leaflet',
      tileUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      attribution: '© CartoDB © OpenStreetMap contributors',
      thumbnail: 'https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/4/8/5.png'
    },
    {
      id: 'mapbox-streets',
      name: 'Mapbox Streets',
      provider: 'mapbox',
      mapboxStyle: 'mapbox://styles/mapbox/streets-v12',
      attribution: '© Mapbox © OpenStreetMap contributors'
    },
    {
      id: 'mapbox-outdoors',
      name: 'Mapbox Outdoors',
      provider: 'mapbox',
      mapboxStyle: 'mapbox://styles/mapbox/outdoors-v12',
      attribution: '© Mapbox © OpenStreetMap contributors'
    },
    {
      id: 'mapbox-light',
      name: 'Mapbox Light',
      provider: 'mapbox',
      mapboxStyle: 'mapbox://styles/mapbox/light-v11',
      attribution: '© Mapbox © OpenStreetMap contributors'
    },
    {
      id: 'mapbox-dark',
      name: 'Mapbox Dark',
      provider: 'mapbox',
      mapboxStyle: 'mapbox://styles/mapbox/dark-v11',
      attribution: '© Mapbox © OpenStreetMap contributors'
    },
    {
      id: 'mapbox-satellite',
      name: 'Mapbox Satellite',
      provider: 'mapbox',
      mapboxStyle: 'mapbox://styles/mapbox/satellite-v9',
      attribution: '© Mapbox © OpenStreetMap contributors'
    },
    {
      id: 'mapbox-satellite-streets',
      name: 'Mapbox Satellite Streets',
      provider: 'mapbox',
      mapboxStyle: 'mapbox://styles/mapbox/satellite-streets-v12',
      attribution: '© Mapbox © OpenStreetMap contributors'
    }
  ];

  getStyle(): MapStyle {
    const styleId = localStorage.getItem(this.STYLE_KEY) || this.DEFAULT_STYLE_ID;
    return this.AVAILABLE_STYLES.find(s => s.id === styleId) || this.AVAILABLE_STYLES[0];
  }

  setStyle(style: MapStyle): void {
    localStorage.setItem(this.STYLE_KEY, style.id);
  }

  getAvailableStyles(): MapStyle[] {
    return this.AVAILABLE_STYLES;
  }

  getLeafletStyles(): MapStyle[] {
    return this.AVAILABLE_STYLES.filter(s => s.provider === 'leaflet');
  }

  getMapboxStyles(): MapStyle[] {
    return this.AVAILABLE_STYLES.filter(s => s.provider === 'mapbox');
  }
}
