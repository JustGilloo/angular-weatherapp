import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DailyWeather, Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class OpenMeteoService {

  constructor(private client: HttpClient) { }

  fetchWeatherForecastWithLocation(latitude: number, longitude: number): Observable<Weather> {
    return this.client.get<Weather>(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
  }

  fetchWeatherForecastDefault(): Observable<Weather> {
    return this.client.get<Weather>(`https://api.open-meteo.com/v1/forecast?latitude=50.8028&longitude=4.3410&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
  }
}
