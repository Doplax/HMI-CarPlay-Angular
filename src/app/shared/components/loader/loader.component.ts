import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-loader',
  standalone: false,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() message: string = 'Loading...';
}
