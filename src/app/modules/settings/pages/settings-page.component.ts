import { Component } from '@angular/core';
import { I18nService } from '../../../shared/services/i18n.service';

@Component({
  selector: 'settings-page',
  standalone: false,
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  constructor(
    public i18n:I18nService
  ) {}

}
