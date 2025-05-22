import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsAppComponent } from './settings-app.component';
import { ConfigStore } from '../../../store/config.store';
import { TitleCasePipe, NgForOf } from '@angular/common';
import { TippyDirective } from '@ngneat/helipopper';
import {provideTippyConfig, provideTippyLoader} from '@ngneat/helipopper/config';
import tippy from 'tippy.js';

describe('SettingsAppComponent', () => {
  let component: SettingsAppComponent;
  let fixture: ComponentFixture<SettingsAppComponent>;
  let mockConfigStore: jasmine.SpyObj<ConfigStore>;

  beforeEach(async () => {
    mockConfigStore = jasmine.createSpyObj('ConfigStore', ['get', 'set', 'clear']);
    mockConfigStore.get.and.returnValue('C');

    await TestBed.configureTestingModule({
      imports: [SettingsAppComponent, NgForOf, TitleCasePipe, TippyDirective],
      providers: [
        { provide: ConfigStore, useValue: mockConfigStore },
        provideTippyConfig({}),
        provideTippyLoader(() => tippy)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return degree unit from configStore', () => {
    expect(component.degreeUnit).toBe('C');
    expect(mockConfigStore.get).toHaveBeenCalledWith('temperatureUnit');
  });

  it('should change background via configStore', () => {
    component.changeBackground('cat.jpg');
    expect(mockConfigStore.set).toHaveBeenCalledWith('background', 'cat.jpg');
  });

  it('should change temperature unit via configStore', () => {
    component.changeDegreesUnit('F');
    expect(mockConfigStore.set).toHaveBeenCalledWith('temperatureUnit', 'F');
  });

  it('should clear configuration', () => {
    component.clearConfigurations();
    expect(mockConfigStore.clear).toHaveBeenCalled();
  });
});
