import {Component, inject, OnInit} from '@angular/core';
import {TippyDirective} from '@ngneat/helipopper';
import {WindowManager} from '../../manager/window.manager';
import {SETTINGS_APP} from '../../apps';
import {NgForOf} from '@angular/common';
import {App} from '../../interfaces/app.interface';
import {ConfigStore} from '../../store/config.store';
import {IconComponent} from '../icon/icon.component';

@Component({
  selector: 'app-taskbar',
  imports: [TippyDirective, NgForOf, IconComponent],
  templateUrl: './taskbar.component.html',
  styleUrl: './taskbar.component.scss'
})
export class TaskbarComponent implements OnInit {
  time = ""
  date = ""
  temperatureInCelsius = 0

  private readonly configStore = inject(ConfigStore);

  ngOnInit() {
    this.setWeatherStats()
    setInterval(() => {
      this.time = this.getLocalTimeString()
      this.date = this.getLocalDateString()
    }, 1000)
  }

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

  getLocalTimeString() {
    const userLocale = navigator.language || 'en-US';
    return new Intl.DateTimeFormat(userLocale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }).format(new Date());
  }

  getLocalDateString() {
    const userLocale = navigator.language || 'en-US';
    return new Intl.DateTimeFormat(userLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date());
  }

  setWeatherStats() {
    console.log('Getting weather stats');
    window.navigator.geolocation.getCurrentPosition((position) => {
      console.log('Got location', position);
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`)
        .then(response => response.json())
        .then(data => {
          console.log('Got weather data', data);
          this.temperatureInCelsius = data.current.temperature_2m;
        });
    }, (error) => {
      console.error('Failed to get location', error);
    });
  }

  get degrees() {
    const temperatureType = this.configStore.get('temperatureUnit')
    return temperatureType === 'C' ? `${this.temperatureInCelsius}°C` : `${this.temperatureInFahrenheit}°F`;
  }

  get temperatureInFahrenheit() {
    return Math.round((this.temperatureInCelsius * 9 / 5 + 32) * 10) / 10;
  }
}
