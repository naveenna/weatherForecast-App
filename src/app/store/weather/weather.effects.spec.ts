import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { WeatherEffects } from './weather.effects';
import { WeatherService } from '../../core/services/weather.service';
import {
  selectCity,
  loadForecastSuccess,
  loadForecastFailure
} from './weather.actions';
import { ForecastDay } from '../../core/models/forecast.model';

describe('WeatherEffects', () => {
  let actions$: Observable<any>;
  let effects: WeatherEffects;
  let weatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(() => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getForecast'
    ]);

    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        provideMockActions(() => actions$),
        { provide: WeatherService, useValue: weatherServiceSpy }
      ]
    });

    effects = TestBed.inject(WeatherEffects);
    weatherService = TestBed.inject(
      WeatherService
    ) as jasmine.SpyObj<WeatherService>;
  });

  it('should dispatch loadForecastSuccess when API call succeeds', (done) => {
    const mockForecast: ForecastDay[] = [
      {
        date: '2026-02-08',
        forecasts: []
      }
    ];

    weatherService.getForecast.and.returnValue(of(mockForecast));

    actions$ = of(selectCity({ city: 'London' }));

    effects.loadForecast$.subscribe(action => {
      expect(weatherService.getForecast).toHaveBeenCalledWith('London');
      expect(action).toEqual(
        loadForecastSuccess({ forecast: mockForecast })
      );
      done();
    });
  });

  it('should dispatch loadForecastFailure when API call fails', (done) => {
    weatherService.getForecast.and.returnValue(
      throwError(() => new Error('API error'))
    );

    actions$ = of(selectCity({ city: 'London' }));

    effects.loadForecast$.subscribe(action => {
      expect(action).toEqual(
        loadForecastFailure({ error: 'Failed to load weather data' })
      );
      done();
    });
  });

  it('should NOT call API when city is empty', (done) => {
    actions$ = of(selectCity({ city: '' }));

    effects.loadForecast$.subscribe({
      next: () => fail('Effect should not emit any action'),
      complete: () => {
        expect(weatherService.getForecast).not.toHaveBeenCalled();
        done();
      }
    });
  });
});
