import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'maps-navigation-controllers',
  standalone: false,
  templateUrl: './maps-navigation-controllers.component.html',
  styleUrl: './maps-navigation-controllers.component.scss'
})
export class MapsNavigationControllersComponent {
  @Input() is3dActive = false;

  @Output() recenter = new EventEmitter<void>();
  @Output() toggle3d = new EventEmitter<void>();
  @Output() zoomIn = new EventEmitter<void>();
  @Output() zoomOut = new EventEmitter<void>();
}
