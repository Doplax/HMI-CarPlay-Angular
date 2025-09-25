import { Component } from '@angular/core';
import { WeatherApiResponse, WeatherDataEntry } from '@modules/weather/models/wather.model';
import { WeatherService } from '@modules/weather/services/weather.service';

@Component({
    selector: 'app-podcast-page',
    templateUrl: './weather-page.component.html',
    styleUrls: ['./weather-page.component.scss'],
    standalone: false
})
export class WeatherPageComponent {

  public weatherData!: WeatherDataEntry[];


  constructor(
    public weatherService: WeatherService
  ){
    this.weatherService.getDailyStation().subscribe(({data} : WeatherApiResponse) => {
      this.weatherData = data;
      debugger
      console.log(this.weatherData);
    });
  }
}
