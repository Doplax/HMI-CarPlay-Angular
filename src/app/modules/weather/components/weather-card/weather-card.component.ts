import { Component, Input } from '@angular/core';
import { WeatherDataEntry } from '@modules/weather/models/wather.model';

@Component({
  selector: 'weather-card',
  standalone: false,
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  @Input() weatherData!: WeatherDataEntry[];

}
