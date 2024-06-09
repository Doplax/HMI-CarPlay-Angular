import { Component, OnInit } from '@angular/core';
import icons from '@src/assets/svg/icons.json';

interface Icon {
  name: string;
  path: string;
}


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  iconsList = icons.icons;  // TODO: destructuring in a better way?


  ngOnInit(): void {
  }

}
