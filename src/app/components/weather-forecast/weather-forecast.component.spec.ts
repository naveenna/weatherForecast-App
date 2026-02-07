import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { WeatherForecastComponent } from './weather-forecast.component';
import { ForecastDay } from '../../core/models/forecast.model';
import { By } from '@angular/platform-browser';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let store: MockStore;

  const mockForecast: ForecastDay[] = [
    {
      date: '2026-02-06',
      forecasts: [
        { time: '09:00:00', temperature: 10, windSpeed: 2, description: 'clear sky', icon: '01d' },
        { time: '12:00:00', temperature: 12, windSpeed: 3, description: 'few clouds', icon: '02d' }
      ]
    },
    {
      date: '2026-02-07',
      forecasts: [
        { time: '09:00:00', temperature: 8, windSpeed: 1, description: 'rain', icon: '09d' }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherForecastComponent],
      providers: [provideMockStore({ initialState: { weather: { forecast: mockForecast, loading: false, selectedCity: 'Birmingham' } } })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(WeatherForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set activeDate to first forecast date by default', () => {
    expect(component.activeDate()).toBe('2026-02-06');
  });

  it('should update selectedDate when selectDate is called', () => {
    component.selectDate('2026-02-07');
    expect(component.activeDate()).toBe('2026-02-07');
  });

  it('should render correct number of date tabs', () => {
    const tabs = fixture.debugElement.queryAll(By.css('.tab'));
    expect(tabs.length).toBe(2);
    expect(tabs[0].nativeElement.textContent.trim()).toContain('2026-02-06');
    expect(tabs[1].nativeElement.textContent.trim()).toContain('2026-02-07');
  });

  it('should render correct number of forecast cards for active date', () => {
    const cards = fixture.debugElement.queryAll(By.css('.forecast-card'));
    // For first date: 2 forecasts
    expect(cards.length).toBe(2);
  });

});
