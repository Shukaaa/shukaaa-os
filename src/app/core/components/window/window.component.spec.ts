import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WindowComponent } from './window.component';
import { IconComponent } from '../icon/icon.component';
import { ViewContainerRef } from '@angular/core';
import { App } from '../../interfaces/app.interface';
import { WindowManager } from '../../manager/window.manager';
import { ConfigStore } from '../../store/config.store';

describe('WindowComponent', () => {
  let component: WindowComponent;
  let fixture: ComponentFixture<WindowComponent>;
  let mockConfigStore: jasmine.SpyObj<ConfigStore>;

  const dummyComponent = class {};
  const mockApp: App = {
    key: 'test-app',
    name: 'Test App',
    type: 'component',
    icon: 'icon',
    component: dummyComponent,
  };

  beforeEach(async () => {
    mockConfigStore = jasmine.createSpyObj('ConfigStore', ['get', 'set']);
    mockConfigStore.get.and.returnValue({});

    await TestBed.configureTestingModule({
      imports: [WindowComponent, IconComponent],
      providers: [{ provide: ConfigStore, useValue: mockConfigStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(WindowComponent);
    component = fixture.componentInstance;

    component['container'] = jasmine.createSpyObj<ViewContainerRef>('ViewContainerRef', ['clear', 'createComponent']);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load component if app.type is "component"', () => {
    component.app = mockApp;
    component.ngOnChanges();

    expect(component['container'].clear).toHaveBeenCalled();
    expect(component['container'].createComponent).toHaveBeenCalledWith(dummyComponent as any);
  });

  it('should open link and close if app.type is "link"', () => {
    spyOn(window, 'open');
    spyOn(component, 'close');

    component.app = {
      key: 'link-app',
      name: 'Link App',
      type: 'link',
      icon: 'icon',
      link: 'https://example.com',
    };

    component.ngOnChanges();

    expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank');
    expect(component.close).toHaveBeenCalled();
  });

  it('should update app position in configStore', () => {
    const newPosition = { x: 100, y: 200 };
    mockConfigStore.get.and.returnValue({});

    component['updateAppPosition']('test-key', newPosition.x, newPosition.y);

    expect(mockConfigStore.set).toHaveBeenCalledWith('appPositions', {
      'test-key': newPosition
    });
  });

  it('should clear container and call WindowManager.closeApp on close()', () => {
    spyOn(WindowManager, 'closeApp');

    component.app = mockApp;
    component.close();

    expect(component['container'].clear).toHaveBeenCalled();
    expect(WindowManager.closeApp).toHaveBeenCalledWith(mockApp);
  });

  it('should call WindowManager.minimizeApp on minimize()', () => {
    spyOn(WindowManager, 'minimizeApp');

    component.app = mockApp;
    component.minimize();

    expect(WindowManager.minimizeApp).toHaveBeenCalledWith(mockApp);
  });

  it('should return default position if none is set', () => {
    mockConfigStore.get.and.returnValue({});

    const pos = component['getAppPosition']('non-existent-key');

    expect(pos).toEqual({ x: 0, y: 0 });
  });

  it('should return style string for app icon', () => {
    mockConfigStore.get.and.returnValue({
      'test-app': { x: 50, y: 75 }
    });

    const style = component.getStyleForAppIcon(mockApp);

    expect(style).toEqual({ left: '50px', top: '75px' });
  });
});
