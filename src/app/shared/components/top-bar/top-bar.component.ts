import { Component, Input } from '@angular/core';
import { I18nService } from '@shared/services/i18n.service';
import { TopBarTab } from '@shared/types/top-bar.type';

@Component({
  selector: 'shared-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  standalone: false,
})
export class TopBarComponent {
  @Input({ required: true }) tabs!: TopBarTab[];

  constructor(public i18n: I18nService) {}
}
