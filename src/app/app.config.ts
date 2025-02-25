import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {ConfigStore} from './core/store/config.store';
import {popperVariation, provideTippyConfig, provideTippyLoader, tooltipVariation} from '@ngneat/helipopper/config';
import tippy from 'tippy.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTippyLoader(() => tippy),
    provideTippyConfig({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
      },
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    ConfigStore
  ]
};
