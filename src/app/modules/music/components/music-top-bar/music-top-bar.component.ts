import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

interface Tab {
  path: string;
  labelKey: string;
  icon: string;
}

@Component({
  selector: 'music-top-bar',
  standalone: false,
  templateUrl: './music-top-bar.component.html',
  styleUrl: './music-top-bar.component.scss',
})
export class MusicTopBarComponent {
  tabs: Tab[] = [
    { path: 'home', labelKey: 'TAB_HOME', icon: 'house' },
    { path: 'new', labelKey: 'TAB_NEW', icon: 'compact-disc' },
    { path: 'radio', labelKey: 'TAB_RADIO', icon: 'tower-broadcast' },
    { path: 'library', labelKey: 'TAB_LIBRARY', icon: 'record-vinyl' },
  ];

  constructor(public i18n: I18nService) {}
}
