import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DesktopComponent } from './desktop.component';
import {ConfigStore} from '../../store/config.store';
import {provideTippyConfig, provideTippyLoader} from '@ngneat/helipopper/config';
import tippy from 'tippy.js';
import {App} from '../../interfaces/app.interface';
import {WindowManager} from '../../manager/window.manager';

describe('DesktopComponent', () => {
  let component: DesktopComponent;
  let fixture: ComponentFixture<DesktopComponent>;

  const mockConfigStore = {
    get: jasmine.createSpy('get').and.returnValue('default.jpg')
  };

  const mockApp: App = {
    key: 'test-app',
    name: 'Test App',
    type: 'component',
    icon: 'icon.png',
    component: class {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopComponent],
      providers: [{ provide: ConfigStore, useValue: mockConfigStore }, provideTippyConfig({}), provideTippyLoader(() => tippy)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct background image path', () => {
    mockConfigStore.get.and.returnValue('background.jpg');
    expect(component.background).toBe('img/backgrounds/background.jpg');
  });

  it('should return currently open app from WindowManager', () => {
    WindowManager.currentlyOpenApp = mockApp;
    expect(component.currentlyOpenApp).toBe(mockApp);
  });
});
