import {SettingsAppComponent} from './components/apps/settings-app/settings-app.component';
import {App} from './interfaces/app.interface';

export const SETTINGS_APP: App = {
  key: "settings",
  name: "Settings",
  icon: "settings.svg",
  type: "component",
  component: SettingsAppComponent
}

export const GITHUB_APP: App = {
  key: "github",
  name: "GitHub",
  icon: "github.svg",
  type: "link",
  link: "https://github.com/Shukaaa"
}

export const MY_MUSIC_APP: App = {
  key: "mymusic",
  name: "My Music",
  icon: "music.svg",
  type: "link",
  link: "https://music.shuka.rip"
}

export const APPS = [
  SETTINGS_APP,
  GITHUB_APP,
  MY_MUSIC_APP
]
