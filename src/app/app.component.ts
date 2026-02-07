import { Component } from '@angular/core';
import { CitySelectorComponent } from './components/city-selector/city-selector.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CitySelectorComponent,
    WeatherForecastComponent
  ],
  templateUrl: './app.component.html',
  styleUrls:['./app.component.scss']
})
export class AppComponent {}
