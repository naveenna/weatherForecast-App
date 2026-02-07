import { createReducer, on } from '@ngrx/store';
import { initialWeatherState } from './weather.state';
import { selectCity, loadForecastSuccess, loadForecastFailure ,clearForecast} from './weather.actions';

export const weatherReducer = createReducer(
  initialWeatherState,

  on(selectCity, (state, { city }) => ({
    ...state,
    selectedCity: city,
    loading: true,
    error: null,
    forecast: []   
  })),

  on(loadForecastSuccess, (state, { forecast }) => ({
    ...state,
    forecast,
    loading: false
  })),

  on(loadForecastFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(clearForecast, (state) => ({
  ...state,
  forecast: [],
  loading: false,
  error: null
}))

);
