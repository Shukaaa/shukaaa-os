import {Component, inject, Input, OnChanges, ViewChild, ViewContainerRef} from '@angular/core';
import { App } from '../../interfaces/app.interface';
import { WindowManager } from '../../manager/window.manager';
import { IconComponent } from '../icon/icon.component';
import { APPS } from '../../apps';
import { NgForOf } from '@angular/common';
import { ConfigStore } from '../../store/config.store';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [IconComponent, NgForOf],
  templateUrl: './window.component.html',
  styleUrl: './window.component.scss'
})
export class WindowComponent implements OnChanges {
  @Input() app: App | null = null;
  @ViewChild('appContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  private readonly configStore = inject(ConfigStore);

  apps = APPS;

  ngOnChanges() {
    if (this.app) this.loadApp();
  }

  private loadApp() {
    if (!this.app) return;

    if (this.app.type === 'component') {
      if (this.container) {
        this.container.clear();
        if (this.app.component) {
          this.container.createComponent(this.app.component);
        }
      }
    }

    if (this.app.type === 'link') {
      window.open(this.app.link, '_blank');
      this.close();
    }
  }

  close() {
    if (this.app) {
      this.container.clear();
      WindowManager.closeApp(this.app);
    }
  }

  minimize() {
    if (this.app) WindowManager.minimizeApp(this.app);
  }

  onMouseDown(event: MouseEvent, app: App) {
    const appElement = document.getElementById(app.key);
    const containerElement = document.getElementById('app-icon-organizer');

    if (!appElement || !containerElement) return;

    const { left, top } = appElement.getBoundingClientRect();
    const offsetX = event.clientX - left;
    const offsetY = event.clientY - top;

    let isDragging = false;
    let dragTimeout: ReturnType<typeof setTimeout>;

    dragTimeout = setTimeout(() => {
      isDragging = true;
      appElement.classList.add('dragging');

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging) return;

        let x = moveEvent.pageX - offsetX - containerElement.offsetLeft;
        let y = moveEvent.pageY - offsetY - containerElement.offsetTop;

        x = Math.max(0, Math.min(containerElement.clientWidth - appElement.clientWidth - 4, x));
        y = Math.max(0, Math.min(containerElement.clientHeight - appElement.clientHeight - 4, y));

        this.updateAppPosition(app.key, x, y);
      };

      const onMouseUp = () => {
        appElement.classList.remove('dragging');
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }, 500);

    const onMouseUp = () => {
      clearTimeout(dragTimeout); // Delayed dragging start; clear timeout if mouse is released before dragging starts

      // If the mouse was not moved, treat it as a click
      if (!isDragging) {
        WindowManager.openApp(app);
      }

      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
  }

  private updateAppPosition(key: string, x: number, y: number) {
    const positions = this.configStore.get('appPositions') as Record<string, { x: number; y: number }>;
    positions[key] = { x, y };
    this.configStore.set('appPositions', positions);
  }

  getStyleForAppIcon(app: App) {
    const { x, y } = this.getAppPosition(app.key);
    return { left: `${x}px`, top: `${y}px` };
  }

  private getAppPosition(key: string) {
    const positions = this.configStore.get('appPositions') as Record<string, { x: number; y: number }>;
    return positions[key] || { x: 0, y: 0 };
  }
}
