import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentStateService } from "@shared/services/current-state.service";

import icons from '@assets/svg/side-bar/index.json';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public inconList: any = icons;

  constructor(private router: Router, public currentState: CurrentStateService) {
  }


  navigateToHome(): void {
    this.router.navigate(['/']);
  }


}
