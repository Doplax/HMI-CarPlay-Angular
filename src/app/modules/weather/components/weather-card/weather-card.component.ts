import { Component, Input } from '@angular/core';
import { WeatherDataEntry } from '@modules/weather/models/wather.model';

@Component({
  selector: 'weather-card',
  standalone: false,
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
})
export class WeatherCardComponent {
  @Input() entry!: WeatherDataEntry;
  @Input() globalMin = 0;
  @Input() globalMax = 0;
  @Input() icon = '☀️';
  @Input() unit: 'C' | 'F' = 'C';

  get rangeOffset(): number {
    const span = this.globalMax - this.globalMin || 1;
    return ((this.entry.tmin - this.globalMin) / span) * 100;
  }

  get rangeWidth(): number {
    const span = this.globalMax - this.globalMin || 1;
    return ((this.entry.tmax - this.entry.tmin) / span) * 100;
  }

  display(celsius: number): number {
    return this.unit === 'F' ? celsius * 9 / 5 + 32 : celsius;
  }
}
