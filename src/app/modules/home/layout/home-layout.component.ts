import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
    selector: 'home-layout',
    templateUrl: './home-layout.component.html',
    styleUrls: ['./home-layout.component.scss'],
    standalone: false
})
export class HomeLayoutComponent {

  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('home', this.i18n.currentLang);
    console.log('Load HomeModule');
  }
}
