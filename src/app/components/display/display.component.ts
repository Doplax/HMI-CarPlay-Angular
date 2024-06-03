import { Component, OnInit } from '@angular/core';
//import { IconService } from '@services/icon.service';
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
  iconsList = icons.icons;
  list = [1,2,3]

  //constructor(private iconService: IconService) {}

  ngOnInit(): void {
    //this.icons = this.iconService.getIcons();
    console.log(this.iconsList);
  }

}
