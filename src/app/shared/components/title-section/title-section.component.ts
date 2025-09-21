import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-title-section',
  standalone: false,
  templateUrl: './title-section.component.html',
  styleUrl: './title-section.component.scss'
})
export class TitleSectionComponent {
  @Input() title: string = '';
}
