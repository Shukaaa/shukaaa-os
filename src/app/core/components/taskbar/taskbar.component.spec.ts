import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TaskbarComponent } from './taskbar.component';
import { ConfigStore } from '../../store/config.store';
import { WindowManager } from '../../manager/window.manager';
import { App } from '../../interfaces/app.interface';
import { IconComponent } from '../icon/icon.component';
import { TippyDirective } from '@ngneat/helipopper';
import { NgForOf } from '@angular/common';
import {provideTippyConfig, provideTippyLoader} from '@ngneat/helipopper/config';
import tippy from 'tippy.js';

describe('TaskbarComponent', () => {
  let component: TaskbarComponent;
  let fixture: ComponentFixture<TaskbarComponent>;
  let mockConfigStore: jasmine.SpyObj<ConfigStore>;

  const dummyApp: App = {
    key: 'settings',
    name: 'Settings',
    type: 'component',
    icon: 'settings',
    component: class {}
  };

  beforeEach(async () => {
    mockConfigStore = jasmine.createSpyObj('ConfigStore', ['get', 'set']);
    mockConfigStore.get.and.returnValue('C');

    await TestBed.configureTestingModule({
      imports: [TaskbarComponent, IconComponent, TippyDirective, NgForOf],
      providers: [
        { provide: ConfigStore, useValue: mockConfigStore },
        provideTippyConfig({}),
        provideTippyLoader(() => tippy)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return formatted time string', () => {
    const time = component.getLocalTimeString();
    expect(typeof time).toBe('string');
  });

  it('should return formatted date string', () => {
    const date = component.getLocalDateString();
    expect(typeof date).toBe('string');
  });

  it('should return Celsius degrees string by default', () => {
    component.temperatureInCelsius = 25;
    mockConfigStore.get.and.returnValue('C');
    expect(component.degrees).toBe('25°C');
  });

  it('should return Fahrenheit degrees string if selected', () => {
    component.temperatureInCelsius = 0;
    mockConfigStore.get.and.returnValue('F');
    expect(component.degrees).toBe('32°F');
  });

  it('should return "--°C" if temperature not set', () => {
    component.temperatureInCelsius = -100;
    mockConfigStore.get.and.returnValue('C');
    expect(component.degrees).toBe('--°C');
  });

  it('should convert Celsius to Fahrenheit correctly', () => {
    component.temperatureInCelsius = 20;
    expect(component.temperatureInFahrenheit).toBeCloseTo(68, 1);
  });

  it('should call WindowManager.openApp on openSettings', () => {
    spyOn(WindowManager, 'openApp');
    component.openSettings();
    expect(WindowManager.openApp).toHaveBeenCalled();
  });

  it('should call WindowManager.openApp on openApp()', () => {
    spyOn(WindowManager, 'openApp');
    component.openApp(dummyApp);
    expect(WindowManager.openApp).toHaveBeenCalledWith(dummyApp);
  });

  it('should call WindowManager.closeApp on closeCurrentApp()', () => {
    WindowManager.currentlyOpenApp = dummyApp;
    spyOn(WindowManager, 'closeApp');
    component.closeCurrentApp();
    expect(WindowManager.closeApp).toHaveBeenCalledWith(dummyApp);
  });

  it('should set interval to update time and date', fakeAsync(() => {
    component.ngOnInit();
    const oldTime = component.time;
    tick(1001);
    expect(component.time).not.toBe(oldTime);
  }));

  it('should handle geolocation failure gracefully', () => {
    const errorSpy = spyOn(console, 'error');
    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((success, error) => {
      if (error) {
        error({code: 1, message: 'User denied'} as GeolocationPositionError);
      }
    });

    component.setWeatherStats();

    expect(errorSpy).toHaveBeenCalledWith('Failed to get location', jasmine.any(Object));
  });
});
