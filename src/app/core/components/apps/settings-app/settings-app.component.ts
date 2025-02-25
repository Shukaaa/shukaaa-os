import {Component, inject} from '@angular/core';
import {NgForOf, TitleCasePipe} from '@angular/common';
import {ConfigStore} from '../../../store/config.store';
import {TippyDirective} from '@ngneat/helipopper';

@Component({
  selector: 'app-settings-app',
  imports: [
    NgForOf,
    TippyDirective,
    TitleCasePipe
  ],
  templateUrl: './settings-app.component.html',
  styleUrl: './settings-app.component.scss'
})
export class SettingsAppComponent {
  private readonly configStore = inject(ConfigStore)

  backgrounds = [
    "cat.jpg",
    "landscape.jpg",
    "minimalistic.jpg"
  ]

  changeBackground(background: string) {
    this.configStore.set("background", background)
  }

  get degreeUnit() {
    return this.configStore.get("temperatureUnit")
  }

  changeDegreesUnit(unit: 'C' | 'F') {
    this.configStore.set("temperatureUnit", unit)
  }
}
