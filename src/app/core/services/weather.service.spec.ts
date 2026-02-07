import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherService } from './weather.service';
import { ForecastDay } from '../models/forecast.model';
import { environment } from '../../../environments/environment';

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

  it('should call OpenWeather API with correct city and params', () => {
    const mockCity = 'London';

    service.getForecast(mockCity).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === environment.weatherApi.baseUrl &&
      request.params.get('q') === mockCity &&
      request.params.get('units') === 'metric' &&
      request.params.get('appid') === environment.weatherApi.apiKey
    );

    expect(req.request.method).toBe('GET');
    req.flush({ list: [] });
  });

  it('should transform API response to ForecastDay[] excluding today', () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    const dayAfterStr = dayAfter.toISOString().split('T')[0];

    const mockResponse = {
      list: [
        // Today - should be skipped
        { dt_txt: `${todayStr} 09:00:00`, main: { temp: 10 }, wind: { speed: 2 }, weather: [{ description: 'sunny', icon: '01d' }] },

        // Tomorrow - multiple entries
        { dt_txt: `${tomorrowStr} 09:00:00`, main: { temp: 12 }, wind: { speed: 3 }, weather: [{ description: 'cloudy', icon: '02d' }] },
        { dt_txt: `${tomorrowStr} 12:00:00`, main: { temp: 14 }, wind: { speed: 4 }, weather: [{ description: 'rain', icon: '10d' }] },

        // Day after tomorrow - single entry
        { dt_txt: `${dayAfterStr} 09:00:00`, main: { temp: 15 }, wind: { speed: 5 }, weather: [{ description: 'fog', icon: '50d' }] },
      ]
    };

    service.getForecast('London').subscribe((result: ForecastDay[]) => {
      // First day after today
      expect(result.length).toBe(2);
      
      // Tomorrow
      expect(result[0].date).toBe(tomorrowStr);
      expect(result[0].forecasts.length).toBe(2);
      expect(result[0].forecasts[0].temperature).toBe(12);
      expect(result[0].forecasts[0].description).toBe('cloudy');
      expect(result[0].forecasts[1].temperature).toBe(14);
      expect(result[0].forecasts[1].description).toBe('rain');

      // Day after tomorrow
      expect(result[1].date).toBe(dayAfterStr);
      expect(result[1].forecasts.length).toBe(1);
      expect(result[1].forecasts[0].temperature).toBe(15);
      expect(result[1].forecasts[0].description).toBe('fog');
    });

    const req = httpMock.expectOne(() => true);
    req.flush(mockResponse);
  });

  it('should handle empty API response gracefully', () => {
    service.getForecast('London').subscribe((result: ForecastDay[]) => {
      expect(result.length).toBe(0);
    });

    const req = httpMock.expectOne(() => true);
    req.flush({ list: [] });
  });

});
