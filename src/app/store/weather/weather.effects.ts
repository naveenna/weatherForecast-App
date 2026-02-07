import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';

import { WeatherService } from '../../core/services/weather.service';
import {
  selectCity,
  loadForecastSuccess,
  loadForecastFailure
} from './weather.actions';

@Injectable()
export class WeatherEffects {

  loadForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectCity),
      switchMap(({ city }) => {

        if (!city) {
          return EMPTY;
        }

        return this.weatherService.getForecast(city).pipe(
          map(forecast =>
            loadForecastSuccess({ forecast })
          ),
          catchError(() =>
            of(loadForecastFailure({ error: 'Failed to load weather data' }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}
}
