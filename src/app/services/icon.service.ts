import { Injectable } from '@angular/core';
import icons from '@src/assets/svg/icons.json';

interface Icon {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private iconsList: any = icons;

  getIcons(): Icon[] {
    return this.iconsList;
  }
}
