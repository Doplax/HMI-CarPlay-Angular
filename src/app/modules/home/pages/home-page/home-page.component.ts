import { Component, OnInit } from '@angular/core';
import { Icon } from '@shared/types/global.interfaces'
import icons  from '@assets/svg/home-page/icons.json';


@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: false
})
export class HomePageComponent implements OnInit{
  iconsList: Icon[] = icons.icons;  // TODO: destructuring in a better way?


  ngOnInit(): void {
  }
}
