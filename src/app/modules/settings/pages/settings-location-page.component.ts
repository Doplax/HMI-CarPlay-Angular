import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings-service.service';

@Component({
  selector: 'settings-location-page',
  templateUrl: './settings-location-page.component.html',
  styleUrls: ['./settings-location-page.component.scss'],
  standalone: false
})
export class SettingsLocationPageComponent implements OnInit {
  latitude: number = 0;
  longitude: number = 0;

  constructor(public settingsService: SettingsService) {}

  ngOnInit(): void {
    const { lat, lng } = this.settingsService.getCoordinates();
    this.latitude = lat;
    this.longitude = lng;
  }

  updateLocation(): void {
    this.settingsService.setCoordinates(this.latitude, this.longitude);
  }

  async updateCurrentLocation(): Promise<void> {
    await this.settingsService.updateCurrentLocation();
    const { lat, lng } = this.settingsService.getCoordinates();
    this.latitude = lat;
    this.longitude = lng;
  }
}
