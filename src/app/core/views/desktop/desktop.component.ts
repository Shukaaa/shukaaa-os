import {Component, inject} from '@angular/core';
import {TaskbarComponent} from '../../components/taskbar/taskbar.component';
import {ConfigStore} from '../../store/config.store';
import {App} from '../../interfaces/app.interface';
import {WindowManager} from '../../manager/window.manager';
import {WindowComponent} from '../../components/window/window.component';

@Component({
  selector: 'app-desktop',
  imports: [
    TaskbarComponent,
    WindowComponent
  ],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {
  private readonly configStore = inject(ConfigStore)

  get background() {
    return "img/backgrounds/" + this.configStore.get("background")
  }

  get currentlyOpenApp(): App | null {
    return WindowManager.currentlyOpenApp
  }
}
