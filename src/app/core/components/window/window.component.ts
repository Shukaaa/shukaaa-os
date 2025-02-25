import {Component, Input, OnChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {App} from '../../interfaces/app.interface';
import {WindowManager} from '../../manager/window.manager';

@Component({
  selector: 'app-window',
  imports: [],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent implements OnChanges {
  @Input() app: App | null = null;
  @ViewChild('appContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  ngOnChanges() {
    if (this.app) {
      console.log('Loading app', this.app);
      this.loadApp();
    }
  }

  private loadApp() {
    if (this.app) {
      this.container.clear();
      this.container.createComponent(this.app.component);
    }
  }

  close() {
    this.container.clear();
    WindowManager.closeApp(this.app!!)
  }

  minimize() {
    WindowManager.minimizeApp(this.app!!)
  }
}
