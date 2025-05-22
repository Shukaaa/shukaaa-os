import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { App } from '../../interfaces/app.interface';
import { By } from '@angular/platform-browser';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  const mockApp: App = {
    key: 'mock-app',
    name: 'Mock App',
    type: 'component',
    icon: 'mock.png',
    component: class {}
  };

  const mockLinkApp: App = {
    key: 'mock-link',
    name: 'Link App',
    type: 'link',
    icon: 'link.png',
    link: 'https://example.com'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the image with correct source and class', () => {
    component.app = mockApp;
    component.size = 'large';
    fixture.detectChanges();

    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl.attributes['src']).toBe('img/app-icons/mock.png');
    expect(imgEl.classes['large']).toBeTrue();
  });

  it('should render app name text by default', () => {
    component.app = mockApp;
    component.disableText = false;
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('.text'));
    expect(span.nativeElement.textContent).toContain('Mock App');
  });

  it('should not render text if disableText is true', () => {
    component.app = mockApp;
    component.disableText = true;
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('.text'));
    expect(span).toBeNull();
  });

  it('should render link icon for link type apps', () => {
    component.app = mockLinkApp;
    fixture.detectChanges();

    const materialIcon = fixture.debugElement.query(By.css('.material-symbols-outlined'));
    expect(materialIcon.nativeElement.textContent).toContain('open_in_new');
  });

  it('should apply "no-text" class when disableText is true', () => {
    component.app = mockApp;
    component.disableText = true;
    fixture.detectChanges();

    const mainEl = fixture.debugElement.query(By.css('main'));
    expect(mainEl.nativeElement.classList).toContain('no-text');
  });
});
