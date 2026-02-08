import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { WeatherService } from './weather.service';
import { environment } from '../../../environments/environment';
import { ForecastDay } from '../models/forecast.model';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should map API response to next 5 days forecast excluding today', () => {
    const today = new Date().toISOString().split('T')[0];

    const mockResponse = {
      list: [
        createForecastItem(`${today} 09:00:00`, 20),
        createForecastItem(`${addDays(today, 1)} 09:00:00`, 21),
        createForecastItem(`${addDays(today, 2)} 09:00:00`, 24),
        createForecastItem(`${addDays(today, 3)} 09:00:00`, 21),
        createForecastItem(`${addDays(today, 4)} 09:00:00`, 23),
        createForecastItem(`${addDays(today, 5)} 09:00:00`, 21)
      ],
    };

    let result!: ForecastDay[];

    service.getForecast('London').subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(
      (req) =>
        req.method === 'GET' && req.url === environment.weatherApi.baseUrl,
    );

    req.flush(mockResponse);

    expect(result.length).toBe(5);
    expect(result.some((day) => day.date === today)).toBeFalse();
  });

  it('should correctly map forecast values', () => {
    const mockResponse = {
      list: [createForecastItem('2026-02-07 12:00:00', 18)],
    };

    let result!: ForecastDay[];

    service.getForecast('London').subscribe((data) => {
      result = data;
    });

    const req = httpMock.expectOne(
      (req) =>
        req.method === 'GET' && req.url === environment.weatherApi.baseUrl,
    );

    req.flush(mockResponse);

    const forecast = result[0].forecasts[0];

    expect(forecast.time).toBe('12:00:00');
    expect(forecast.temperature).toBe(18);
    expect(forecast.windSpeed).toBe(5);
    expect(forecast.description).toBe('clear sky');
    expect(forecast.icon).toBe('01d');
  });
});

/* ---------- Helper ---------- */

function createForecastItem(dateTime: string, temp: number) {
  return {
    dt_txt: dateTime,
    main: {
      temp,
    },
    wind: {
      speed: 5,
    },
    weather: [
      {
        description: 'clear sky',
        icon: '01d',
      },
    ],
  };
}
function addDays(base: string, days: number): string {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}