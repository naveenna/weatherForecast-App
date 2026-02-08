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
          units: 'metric', // to get units in celsius
          appid: apiKey,
        },
      })
      .pipe(
        map(response => this.mapToNextFiveDaysForecast(response))
      );
  }

  // Maps API response to UI-friendly daily forecast (next 5 days only)
  private mapToNextFiveDaysForecast(response: any): ForecastDay[] {
    const groupedByDate = this.groupForecastByDate(response.list);
    const upcomingDates = this.getNextFiveDates(groupedByDate);

    return upcomingDates.map(date => ({
      date,
      forecasts: groupedByDate.get(date)!.map(item => ({
        time: this.extractTime(item.dt_txt),
        temperature: Math.round(item.main.temp),
        windSpeed: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      })),
    }));
  }

  private groupForecastByDate(list: any[]): Map<string, any[]> {
    const map = new Map<string, any[]>();

    for (const item of list) {
      const date = this.extractDate(item.dt_txt);

      if (!map.has(date)) {
        map.set(date, []);
      }

      map.get(date)!.push(item);
    }

    return map;
  }

  // Explicitly excludes today and returns next 5 dates
  private getNextFiveDates(groupedData: Map<string, any[]>): string[] {
    const today = this.getTodayDate();

    return Array.from(groupedData.keys())
      .filter(date => date !== today)
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private extractDate(dateTime: string): string {
    return dateTime.split(' ')[0];
  }

  private extractTime(dateTime: string): string {
    return dateTime.split(' ')[1];
  }
}
