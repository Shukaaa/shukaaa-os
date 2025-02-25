import {App} from '../interfaces/app.interface';

export class WindowManager {
  static currentlyOpenApp: App | null = null;
  static minimizedApps: App[] = [];

  static openApp(app: App): void {
    if (this.currentlyOpenApp) {
      return;
    }

    this.currentlyOpenApp = app;
    this.minimizedApps = this.minimizedApps.filter(minimizedApp => minimizedApp.key !== app.key);
  }

  static minimizeApp(app: App): void {
    if (this.currentlyOpenApp?.key === app.key) {
      this.minimizedApps.push(this.currentlyOpenApp);
      this.currentlyOpenApp = null;
    }
  }

  static closeApp(app: App): void {
    if (this.currentlyOpenApp?.key === app.key) {
      this.currentlyOpenApp = null;
    }

    this.minimizedApps = this.minimizedApps.filter(minimizedApp => minimizedApp.key !== app.key);
  }
}
