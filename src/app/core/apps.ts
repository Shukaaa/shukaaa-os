import {SettingsAppComponent} from './components/apps/settings-app/settings-app.component';
import {App} from './interfaces/app.interface';

export const SETTINGS_APP: App = {
  key: "settings",
  name: "Settings",
  icon: "settings",
  component: SettingsAppComponent
}

