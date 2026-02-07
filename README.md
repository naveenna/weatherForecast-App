# WeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# WeatherApp

This is a **5-Day Weather Forecast Angular 17+ application** that allows users to select a city and view the upcoming 5-day forecast. The app uses **NgRx store** for state management and **Angular Signals** for reactive UI updates.

---

## Features

- Select a city from a dropdown (`Birmingham`, `London`, `Cardiff`)
- View **5-day forecast** 
- Forecast displayed in **tabs**, one per day
- Auto-selects the first date of the forecast
- Changing city resets the selected date to the first forecast
- Responsive **forecast cards** showing:
  - Time
  - Temperature (°C)
  - Wind speed (m/s)
  - Weather description
  - Icon
- Loading spinner while fetching data
- Styled using CSS with hover effects and responsive layout
- Unit tests for service and components

---

## Project Structure
src/app/
├─ core/
│ ├─ models/forecast.model.ts
│ └─ services/weather.service.ts
├─ store/weather/
│ ├─ weather.actions.ts
│ ├─ weather.reducer.ts
│ ├─ weather.selectors.ts
│ |─ weather.effects.ts
  └─ weather.state.ts 
|
├─ components/
│ ├─ city-selector/
│ └─ weather-forecast/
├─ app.component.ts
|─ environments/
