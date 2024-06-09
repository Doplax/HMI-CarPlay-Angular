import { Component, OnInit } from '@angular/core';
import icons from '@src/assets/svg/icons.json';
import { Icon } from '@customTypes/global.interfaces'


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  iconsList: Icon[] = icons.icons;  // TODO: destructuring in a better way?


  ngOnInit(): void {
  }
}
