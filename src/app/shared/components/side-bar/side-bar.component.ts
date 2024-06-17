import { Component } from '@angular/core';
import { Router } from '@angular/router';

import icons from '@assets/svg/side-bar/index.json';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public inconList: any = icons;

  constructor(private router: Router) {
  }


  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
