import { Component } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';

@Component({
    selector: 'podcast-layout',
    templateUrl: './podcast-layout.component.html',
    styleUrls: ['./podcast-layout.component.scss'],
    standalone: false
})
export class PodcastLayoutComponent {

  constructor(public i18n: I18nService){
    this.i18n.loadTranslations('podcast', this.i18n.currentLang);
    console.log('Loaded PodcastModule');

  }
}
