import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
  selector: 'app-calendar-layout',
  standalone: false,
  templateUrl: './calendar-layout.component.html',
  styleUrl: './calendar-layout.component.scss'
})
export class CalendarLayoutComponent {


  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('calendar', this.i18n.currentLang);
    console.log('Loaded CalendarModule');
  }
}
