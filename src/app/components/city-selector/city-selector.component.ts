import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearForecast, selectCity } from '../../store/weather/weather.actions';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitySelectorComponent {
    //User required data for cities
  cities = ['Birmingham', 'London', 'Cardiff'];

  constructor(private store: Store) {}

  onCityChange(city: string) {
    // Dispatch appropriate action based on selection
    city ? this.store.dispatch(selectCity({ city })) : this.store.dispatch(clearForecast());
  }
}
