import { Component, OnInit } from '@angular/core';
import { Icon } from '@shared/types/global.interfaces'
import icons  from '@assets/svg/home-page/icons.json';
import { I18nService } from '@shared/services/i18n.service';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: false
})
export class HomePageComponent {
  iconsList: Icon[] = icons.icons;

    constructor(public i18n: I18nService){}

}
