import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { StocksFeatureShellModule } from '../stocks-feature-shell.module';
import { StocksComponent } from './stocks.component';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StoreModule } from '@ngrx/store';
import { Store } from '@ngrx/Store';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ PriceQueryFacade, Store, FormBuilder ],
      imports:[
        BrowserAnimationsModule,
        StocksFeatureShellModule,
        StoreModule.forRoot({})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
