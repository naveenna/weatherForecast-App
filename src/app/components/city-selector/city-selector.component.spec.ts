import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CitySelectorComponent } from './city-selector.component';
import { selectCity, clearForecast } from '../../store/weather/weather.actions';
import { By } from '@angular/platform-browser';

describe('CitySelectorComponent', () => {
  let component: CitySelectorComponent;
  let fixture: ComponentFixture<CitySelectorComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySelectorComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(CitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 cities plus default option', () => {
    const selectEl = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(selectEl.options.length).toBe(4); // 3 + "-- Choose a city --"
  });

  it('should dispatch clearForecast when no city is selected', () => {
    component.onCityChange('');
    expect(dispatchSpy).toHaveBeenCalledWith(clearForecast());
  });

  it('should dispatch selectCity when a city is selected', () => {
    const city = 'London';
    component.onCityChange(city);
    expect(dispatchSpy).toHaveBeenCalledWith(selectCity({ city }));
  });
});
