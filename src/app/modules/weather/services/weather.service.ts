import { Injectable } from '@angular/core';
import { WeatherApiResponse } from '../models/wather.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getDailyStation(): Observable<WeatherApiResponse> {
      return  this.http.get<WeatherApiResponse>('/assets/api/weather/daily-station-data.json');
  }
}
