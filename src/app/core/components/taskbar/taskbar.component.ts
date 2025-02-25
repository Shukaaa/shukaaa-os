import { Component } from '@angular/core';
import {TippyDirective} from '@ngneat/helipopper';
import {WindowManager} from '../../manager/window.manager';
import {SETTINGS_APP} from '../../apps';
import {NgForOf} from '@angular/common';
import {App} from '../../interfaces/app.interface';

@Component({
  selector: 'app-taskbar',
  imports: [TippyDirective, NgForOf],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.scss'
})
export class TaskbarComponent {
  openSettings() {
    WindowManager.openApp(SETTINGS_APP);
  }

  get apps() {
    return WindowManager.minimizedApps;
  }

  get currentlyOpenApp() {
    return WindowManager.currentlyOpenApp;
  }

  closeCurrentApp() {
    WindowManager.closeApp(WindowManager.currentlyOpenApp!!);
  }

  openApp(app: App) {
    WindowManager.openApp(app);
  }
}
