import { App } from '../interfaces/app.interface';
import {WindowManager} from './window.manager';

describe('WindowManager', () => {
  const app1: App = { key: 'app1', name: 'App 1' } as App;
  const app2: App = { key: 'app2', name: 'App 2' } as App;

  beforeEach(() => {
    (WindowManager as any).currentlyOpenApp = null;
    (WindowManager as any).minimizedApps = [];
  });

  it('should open an app if none is currently open', () => {
    WindowManager.openApp(app1);
    expect(WindowManager.currentlyOpenApp).toEqual(app1);
  });

  it('should not open a new app if one is already open', () => {
    WindowManager.openApp(app1);
    WindowManager.openApp(app2);
    expect(WindowManager.currentlyOpenApp).toEqual(app1);
  });

  it('should remove the app from minimizedApps when it is opened', () => {
    WindowManager.minimizedApps = [app1];
    WindowManager.openApp(app1);
    expect(WindowManager.minimizedApps).not.toContain(app1);
  });

  it('should minimize the currently open app', () => {
    WindowManager.openApp(app1);
    WindowManager.minimizeApp(app1);
    expect(WindowManager.currentlyOpenApp).toBeNull();
    expect(WindowManager.minimizedApps).toContain(app1);
  });

  it('should not minimize an app if it is not currently open', () => {
    WindowManager.minimizeApp(app1);
    expect(WindowManager.minimizedApps).not.toContain(app1);
  });

  it('should close the currently open app', () => {
    WindowManager.openApp(app1);
    WindowManager.closeApp(app1);
    expect(WindowManager.currentlyOpenApp).toBeNull();
  });

  it('should remove the app from minimizedApps when closed', () => {
    WindowManager.minimizedApps = [app1];
    WindowManager.closeApp(app1);
    expect(WindowManager.minimizedApps).not.toContain(app1);
  });

  it('should handle closing a non-open, minimized app gracefully', () => {
    WindowManager.minimizedApps = [app1];
    WindowManager.closeApp(app1);
    expect(WindowManager.currentlyOpenApp).toBeNull();
    expect(WindowManager.minimizedApps).toEqual([]);
  });
});
