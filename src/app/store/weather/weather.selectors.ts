import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

export const selectWeatherState =
  createFeatureSelector<WeatherState>('weather');

export const selectSelectedCity = createSelector(
  selectWeatherState,
  (state) => state.selectedCity
);

export const selectForecast = createSelector(
  selectWeatherState,
  (state) => state.forecast
);

export const selectLoading = createSelector(
  selectWeatherState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectWeatherState,
  (state) => state.error
);
