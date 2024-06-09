import { Component, OnInit } from '@angular/core';
import icons from '@src/assets/svg/icons.json';
import { Icon } from '@customTypes/global.interfaces'




@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  iconsList: Icon[] = icons.icons;  // TODO: destructuring in a better way?


  ngOnInit(): void {
  }

}
