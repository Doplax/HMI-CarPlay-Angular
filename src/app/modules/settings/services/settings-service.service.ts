import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageData } from '@modules/messages/types/message.type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  provinces: string[] = [
    'Álava',
    'Albacete',
    'Alicante',
    'Almería',
    'Asturias',
    'Ávila',
    'Badajoz',
    'Barcelona',
    'Burgos',
    'Cáceres',
    'Cádiz',
    'Cantabria',
    'Castellón',
    'Ceuta',
    'Ciudad Real',
    'Córdoba',
    'Cuenca',
    'Girona',
    'Granada',
    'Guadalajara',
    'Guipúzcoa',
    'Huelva',
    'Huesca',
    'Illes Balears',
    'Jaén',
    'La Coruña',
    'La Rioja',
    'Las Palmas',
    'León',
    'Lleida',
    'Lugo',
    'Madrid',
    'Málaga',
    'Melilla',
    'Murcia',
    'Navarra',
    'Ourense',
    'Palencia',
    'Pontevedra',
    'Salamanca',
    'Segovia',
    'Sevilla',
    'Soria',
    'Tarragona',
    'Tenerife',
    'Teruel',
    'Toledo',
    'Valencia',
    'Valladolid',
    'Vizcaya',
    'Zamora',
    'Zaragoza',
  ];

  lightMode: boolean = false;

  latitude: number | null = null;  // <-- store latitude in the service
  longitude: number | null = null; // <-- store longitude in the service

  constructor(
    private http: HttpClient
  ) { }



  // THEME
  getLightMode(): boolean {
    return this.lightMode;
  }

  switchLightMode(): boolean {
    return this.lightMode = !this.lightMode;
  }

  // LOCATION
  getProvincesList(): string[] {
    return this.provinces;
  }

  async updateCurrentLocation(){
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      this.latitude = position.coords.latitude;    // e.g., 41.3851 <-- user's latitude
      this.longitude = position.coords.longitude;  // e.g., 2.1734 <-- user's longitude
    } catch (error) {
      // error: GeolocationPositionError
      alert('Location access denied or unavailable'); // <-- if user blocks location

    }
  }

  getCoordinates(): {lat: number, lng: number} {
    const lat = this.latitude ?? 2.15;
    const lng = this.longitude ?? 41.5;

    return { lat, lng }
  }

}
