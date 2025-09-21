import { Component } from '@angular/core';
import { I18nService } from '@src/app/shared/services/i18n.service';

@Component({
  selector: 'music-layout',
  standalone: false,
  templateUrl: './music-layout.component.html',
  styleUrl: './music-layout.component.scss'
})
export class MusicLayoutComponent {
  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('music', this.i18n.currentLang);
    console.log('Loaded MusicModule');
  }
}
