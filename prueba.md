import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-color-box',
  template: `
    <button (click)="toggleColor()">Toggle Color</button>
  `,
  styles: [`
    :host {
      display: block;
      width: 200px;
      height: 200px;
      transition: background-color 0.5s ease;
    }
    :host(.blue) {
      background-color: blue;
    }
    :host(.green) {
      background-color: green;
    }
  `]
})
export class ColorBoxComponent {
  private isBlue: boolean = true;

  @HostBinding('class.blue') get blue() {
    return this.isBlue;
  }

  @HostBinding('class.green') get green() {
    return !this.isBlue;
  }

  toggleColor() {
    this.isBlue = !this.isBlue;
  }
}
