import {
  selectWeatherState,
  selectSelectedCity,
  selectForecast,
  selectLoading,
  selectError
} from './weather.selectors';
import { WeatherState } from './weather.state';
import { ForecastDay } from '../../core/models/forecast.model';

describe('Weather Selectors', () => {

  const mockForecast: ForecastDay[] = [
    {
      date: '2026-02-08',
      forecasts: []
    }
  ];

  const weatherState: WeatherState = {
    selectedCity: 'London',
    forecast: mockForecast,
    loading: true,
    error: 'Some error'
  };

  const appState = {
    weather: weatherState
  };

  it('should select the weather state', () => {
    const result = selectWeatherState(appState);

    expect(result).toEqual(weatherState);
  });

  it('should select selected city', () => {
    const result = selectSelectedCity(appState);

    expect(result).toBe('London');
  });

  it('should select forecast', () => {
    const result = selectForecast(appState);

    expect(result).toEqual(mockForecast);
  });

  it('should select loading flag', () => {
    const result = selectLoading(appState);

    expect(result).toBeTrue();
  });

  it('should select error', () => {
    const result = selectError(appState);

    expect(result).toBe('Some error');
  });

});
