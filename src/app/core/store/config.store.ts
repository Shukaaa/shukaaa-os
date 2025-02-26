import {LocalStorageStore} from './local-storage.store';
import {Config} from '../interfaces/config.interface';
import {Injectable} from '@angular/core';

@Injectable()
export class ConfigStore extends LocalStorageStore<Config>{
  storeKey = "config";
  defaultValue: Config = {
    background: "landscape.jpg",
    temperatureUnit: "C",
    appPositions: {
      settings: {
        x: 0,
        y: 0
      },
      github: {
        x: 0,
        y: 100
      }
    }
  }
}
