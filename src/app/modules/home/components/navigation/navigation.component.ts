import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home-navigation',
  standalone: false,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  constructor(private router: Router) {}

  icons = [0,1];
  activeIndex = 1;

  prevIcon() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.navigate();
    }
  }

  nextIcon() {
    if (this.activeIndex < this.icons.length - 1) {
      this.activeIndex++;
      this.navigate();
    }
  }

  navigate() {
    if (this.activeIndex === 1) {
      this.router.navigate(['home']); 
    } else if (this.activeIndex === 0) {
      this.router.navigate(['home/split']); 
    }
  }
}
