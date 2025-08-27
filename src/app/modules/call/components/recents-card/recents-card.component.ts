import { Component, input } from '@angular/core';

@Component({
  selector: 'app-recents-card',
  imports: [],
  templateUrl: './recents-card.component.html',
  styleUrl: './recents-card.component.scss'
})
export class RecentsCardComponent {
  @Input() name: string = 'Recents';
  @Input() date: string = 'Recents';


}
