import { weatherReducer } from './weather.reducer';
import { initialWeatherState } from './weather.state';
import {
  selectCity,
  loadForecastSuccess,
  loadForecastFailure,
  clearForecast
} from './weather.actions';
import { ForecastDay } from '../../core/models/forecast.model';

describe('Weather Reducer', () => {

  it('should return the initial state for an unknown action', () => {
    const action = { type: 'UNKNOWN' } as any;

    const state = weatherReducer(initialWeatherState, action);

    expect(state).toBe(initialWeatherState);
  });

  it('should handle selectCity', () => {
    const action = selectCity({ city: 'London' });

    const state = weatherReducer(initialWeatherState, action);

    expect(state.selectedCity).toBe('London');
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
    expect(state.forecast.length).toBe(0);
  });

  it('should handle loadForecastSuccess', () => {
    const mockForecast: ForecastDay[] = [
      {
        date: '2026-02-08',
        forecasts: []
      }
    ];

    const loadingState = {
      ...initialWeatherState,
      loading: true
    };

    const action = loadForecastSuccess({ forecast: mockForecast });

    const state = weatherReducer(loadingState, action);

    expect(state.forecast).toEqual(mockForecast);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

  it('should handle loadForecastFailure', () => {
    const error = 'Failed to load weather data';

    const loadingState = {
      ...initialWeatherState,
      loading: true
    };

    const action = loadForecastFailure({ error });

    const state = weatherReducer(loadingState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBeFalse();
  });

  it('should handle clearForecast', () => {
    const populatedState = {
      ...initialWeatherState,
      forecast: [{ date: '2026-02-08', forecasts: [] }],
      loading: true,
      error: 'Some error'
    };

    const action = clearForecast();

    const state = weatherReducer(populatedState, action);

    expect(state.forecast.length).toBe(0);
    expect(state.loading).toBeFalse();
    expect(state.error).toBeNull();
  });

});
