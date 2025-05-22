import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ConfigStore} from './core/store/config.store';
import {provideTippyConfig, provideTippyLoader} from '@ngneat/helipopper/config';
import tippy from 'tippy.js';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [ConfigStore, provideTippyConfig({}), provideTippyLoader(() => tippy), provideTippyLoader(() => tippy)]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
