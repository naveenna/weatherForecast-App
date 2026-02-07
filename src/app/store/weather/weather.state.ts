import { ForecastDay } from '../../core/models/forecast.model';

export interface WeatherState {
  selectedCity: string | null;
  forecast: ForecastDay[];
  loading: boolean;
  error: string | null;
}

export const initialWeatherState: WeatherState = {
  selectedCity: null,
  forecast: [],
  loading: false,
  error: null
};
