import { createAction, props } from '@ngrx/store';
import { ForecastDay } from '../../core/models/forecast.model';

export const selectCity = createAction(
  '[Weather] Select City',
  props<{ city: string }>()
);

export const loadForecastSuccess = createAction(
  '[Weather] Load Forecast Success',
  props<{ forecast: ForecastDay[] }>()
);

export const loadForecastFailure = createAction(
  '[Weather] Load Forecast Failure',
  props<{ error: string }>()
);

export const clearForecast = createAction(
  '[Weather] Clear Forecast'
);
