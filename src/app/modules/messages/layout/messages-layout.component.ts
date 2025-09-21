import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
    selector: 'messages-layout',
    templateUrl: './messages-layout.component.html',
    styleUrls: ['./messages-layout.component.scss'],
    standalone: false
})
export class MessagesLayoutComponent {

  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('messages', this.i18n.currentLang);
    console.log('Loaded MessagesModule');

  }
}
