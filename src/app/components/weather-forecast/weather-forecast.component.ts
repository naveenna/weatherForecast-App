import {
  Component,
  signal,
  computed,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import {
  selectForecast,
  selectLoading,
  selectSelectedCity,
} from '../../store/weather/weather.selectors';
import { ForecastDay } from '../../core/models/forecast.model';

@Component({
  selector: 'app-weather-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherForecastComponent {
  // Convert store observables to signals
  forecast = toSignal(this.store.select(selectForecast), { initialValue: [] });
  loading = toSignal(this.store.select(selectLoading), { initialValue: false });
  selectedCity = toSignal(this.store.select(selectSelectedCity), {
    initialValue: null,
  });

  // User-selected tab
  selectedDate = signal<string | null>(null);

  // Default selection: user-selected OR first date of forecast
  activeDate = computed(
    () => this.selectedDate() ?? this.forecast()[0]?.date ?? null,
  );

  constructor(private store: Store) {
    // Reset selectedDate whenever the city changes and new forecast arrives
    effect(
      () => {
        const forecast = this.forecast();
        if (forecast.length) {
          this.selectedDate.set(forecast[0].date);
        }
      },
      { allowSignalWrites: true },
    );
  }

  // Called when user clicks a tab
  selectDate(date: string) {
    this.selectedDate.set(date);
  }
}
