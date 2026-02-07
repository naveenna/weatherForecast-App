import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { ForecastDay } from '../models/forecast.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getForecast(city: string): Observable<ForecastDay[]> {
    const { baseUrl, apiKey } = environment.weatherApi;

    return this.http
      .get<any>(baseUrl, {
        params: {
          q: city,
          units: 'metric', // Celsius
          appid: apiKey,
        },
      })
      .pipe(map((response) => this.mapToDailyForecast(response)));
  }

  private mapToDailyForecast(response: any): ForecastDay[] {
    const dailyMap = new Map<string, any[]>();

    for (const item of response.list) {
      const date = item.dt_txt.split(' ')[0];

      if (!dailyMap.has(date)) {
        dailyMap.set(date, []);
      }

      dailyMap.get(date)!.push(item);
    }

    return Array.from(dailyMap.entries())
      .slice(1, 6)
      .map(([date, items]) => ({
        date,
        forecasts: items.map((i) => ({
          time: i.dt_txt.split(' ')[1],
          temperature: Math.round(i.main.temp),
          windSpeed: i.wind.speed,
          description: i.weather[0].description,
          icon: i.weather[0].icon,
        })),
      }));
  }
}
