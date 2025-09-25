import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
    selector: 'weather-layout',
    templateUrl: './weather-layout.component.html',
    styleUrls: ['./weather-layout.component.scss'],
    standalone: false
})
export class WeatherLayoutComponent {

  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('weather', this.i18n.currentLang);
    console.log('Loaded WeatherModule');

  }
}
