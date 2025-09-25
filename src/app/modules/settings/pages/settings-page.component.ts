import { Component } from '@angular/core';
import { I18nService } from '../../../shared/services/i18n.service';
import { SettingsService } from '../services/settings-service.service';

@Component({
  selector: 'settings-page',
  standalone: false,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  provinces!: string[];
  selectedProvince: string = '';

  constructor(
    public i18n: I18nService,
    public settingsService : SettingsService
  ) {
    this.provinces = this.settingsService.getProvincesList();
  }
}
