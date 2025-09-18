import { Injectable } from '@angular/core';
import icons from '@src/assets/svg/icons.json';
import { Icon } from '@customTypes/global.interfaces'



@Injectable({
  providedIn: 'root',
})
export class IconService {
  private iconsList: any = icons;

  getIcons(): Icon[] {
    return this.iconsList;
  }
}