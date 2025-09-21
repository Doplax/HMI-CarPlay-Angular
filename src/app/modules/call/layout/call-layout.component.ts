import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
    selector: 'call-layout',
    templateUrl: './call-layout.component.html',
    styleUrls: ['./call-layout.component.scss'],
    standalone: false
})
export class CallLayoutComponent {

  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('call', this.i18n.currentLang);
    console.log('Loaded CallModule');
  }
}
