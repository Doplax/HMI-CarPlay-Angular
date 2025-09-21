import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
    selector: 'maps-layout',
    templateUrl: './maps-layout.component.html',
    styleUrls: ['./maps-layout.component.scss'],
    standalone: false
})
export class MapsLayoutComponent {

  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('maps', this.i18n.currentLang);
    console.log('Loaded Maps Module');

  }
}
