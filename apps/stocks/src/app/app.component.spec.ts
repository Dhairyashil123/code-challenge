import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { APP_CONST } from '../../../constants/app.constant';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture < AppComponent > ;
  let app;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    app = fixture.debugElement.nativeElement;
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'stocks'`, () => {
    expect(component.title).toEqual(APP_CONST.TITLE);
  });

  it('should render title in a h1 tag', async(() => {
    expect(app.querySelector('h1').textContent).toContain(
      APP_CONST.GREETING_MSG
    );
  }));
});
