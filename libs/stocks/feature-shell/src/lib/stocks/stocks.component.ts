import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { STOCK_BUTTONS, STOCK_FORM_LABEL, PERIOD } from '../../../../../../../code-challenge/apps/constants/stocks.constant';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  public stockPickerForm: FormGroup;
  public symbol: string;
  public period: string;
  public subscription: Subscription;
  public tomorrow = new Date();
  public quotes$: Observable<(string | number)[][]>;
  public stockButtons = STOCK_BUTTONS;
  public stockLabels = STOCK_FORM_LABEL;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
    });
    this.tomorrow.setDate(this.tomorrow.getDate());
  }

  ngOnInit() {
    this.quotes$ = this.priceQuery.priceQueries$;
    this.subscription = this.stockPickerForm.valueChanges.subscribe(value => {
      if(this.stockPickerForm.controls.fromDate.value && this.stockPickerForm.controls.fromDate.value > this.stockPickerForm.controls.toDate.value) {
        this.stockPickerForm.controls['fromDate'].setValue(new Date(this.stockPickerForm.controls.toDate.value));
      } else if(this.stockPickerForm.controls.toDate.value && this.stockPickerForm.controls.fromDate.value > this.stockPickerForm.controls.toDate.value) {
        this.stockPickerForm.controls['toDate'].setValue(new Date(this.stockPickerForm.controls.fromDate.value));
      }
    })
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, PERIOD.MAX);
      this.priceQuery.fetchFilterQuoteByDate(
        this.stockPickerForm.value.fromDate, this.stockPickerForm.value.toDate
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
