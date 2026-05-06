import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import {
  WeatherApiResponse,
  WeatherDataEntry,
  WeatherHourlyApiResponse,
  WeatherHourlyEntry,
} from '@modules/weather/models/wather.model';
import { WeatherService } from '@modules/weather/services/weather.service';
import { SettingsService } from '@modules/settings/services/settings-service.service';

@Component({
  selector: 'app-weather-page',
  templateUrl: './weather-page.component.html',
  styleUrls: ['./weather-page.component.scss'],
  standalone: false,
})
export class WeatherPageComponent {
  public dailyData: WeatherDataEntry[] = [];
  public hourlyData: WeatherHourlyEntry[] = [];
  public today?: WeatherDataEntry;
  public upcomingHours: WeatherHourlyEntry[] = [];
  public rangeMin = 0;
  public rangeMax = 0;

  constructor(
    public weatherService: WeatherService,
    public settingsService: SettingsService,
  ) {
    forkJoin({
      daily: this.weatherService.getDailyStation(),
      hourly: this.weatherService.getHourlyStation(),
    }).subscribe(({ daily, hourly }: { daily: WeatherApiResponse; hourly: WeatherHourlyApiResponse }) => {
      this.dailyData = daily.data.slice(0, 10);
      this.today = this.dailyData[0];
      this.hourlyData = hourly.data;
      this.upcomingHours = hourly.data.slice(0, 24);

      const mins = this.dailyData.map((d) => d.tmin);
      const maxs = this.dailyData.map((d) => d.tmax);
      this.rangeMin = Math.min(...mins);
      this.rangeMax = Math.max(...maxs);
    });
  }

  public toUnit(celsius: number): number {
    return this.settingsService.getTemperatureUnit() === 'F'
      ? celsius * 9 / 5 + 32
      : celsius;
  }

  public conditionLabel(entry?: WeatherDataEntry): string {
    if (!entry) return '';
    if (entry.snow) return 'Snow';
    if (entry.prcp > 0) return 'Rain';
    return 'Sunny';
  }

  public conditionIcon(entry: { prcp?: number | null; snow?: number | null; coco?: number | null }): string {
    if (entry.coco != null) {
      if (entry.coco >= 14) return '❄️';
      if (entry.coco >= 7) return '🌧️';
      if (entry.coco >= 4) return '☁️';
      if (entry.coco >= 2) return '⛅';
      return '☀️';
    }
    if (entry.snow) return '❄️';
    if ((entry.prcp ?? 0) > 0) return '🌧️';
    return '☀️';
  }
}
