import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { weatherReducer } from './app/store/weather/weather.reducer';
import { WeatherEffects } from './app/store/weather/weather.effects';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),

    provideStore({
      weather: weatherReducer
    }),

    provideEffects([WeatherEffects]),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production
    })
  ]
}).catch(err => console.error(err));
