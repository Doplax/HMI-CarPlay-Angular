import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
    selector: 'settings-layout',
    templateUrl: './settings-layout.component.html',
    styleUrls: ['./settings-layout.component.scss'],
    standalone: false
})
export class SettingsLayoutComponent {

  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('settings', this.i18n.currentLang);
    console.log('Loaded SettingsModule');
  }
}
