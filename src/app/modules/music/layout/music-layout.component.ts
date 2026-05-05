import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';
import { musicTopBarTabs } from '@modules/music/music.config';

@Component({
  selector: 'music-layout',
  standalone: false,
  templateUrl: './music-layout.component.html',
  styleUrl: './music-layout.component.scss',
})
export class MusicLayoutComponent {
  tabs = musicTopBarTabs;

  constructor(public i18n: I18nService) {
    this.i18n.loadTranslations('music', this.i18n.currentLang);
    console.log('Loaded MusicModule');
  }
}
