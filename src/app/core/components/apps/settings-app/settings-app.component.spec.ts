import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppComponent } from './settings-app.component';

describe('SettingsAppComponent', () => {
  let component: SettingsAppComponent;
  let fixture: ComponentFixture<SettingsAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
