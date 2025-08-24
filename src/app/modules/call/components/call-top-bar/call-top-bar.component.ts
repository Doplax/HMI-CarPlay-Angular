import { Component } from '@angular/core';
import icons  from '@src/assets/svg/call-top-bar/index.json';


@Component({
    selector: 'call-top-bar',
    templateUrl: './call-top-bar.component.html',
    styleUrls: ['./call-top-bar.component.scss'],
    standalone: false
})
export class CallTopBarComponent {
  iconList = icons;  // TODO: destructuring in a better way?

}
