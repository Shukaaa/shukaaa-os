import { Component } from '@angular/core';
import {DesktopComponent} from './core/views/desktop/desktop.component';

@Component({
  selector: 'app-root',
  imports: [DesktopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
