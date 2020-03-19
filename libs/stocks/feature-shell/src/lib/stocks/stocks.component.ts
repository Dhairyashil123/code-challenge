import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { debounceTime } from 'rxjs/operators';
import { STOCK_FORM_LABEL, PLACEHOLDERS, DEBOUNCE_TIME } from '../../../../constant/stocks.constant';
import { Period, PeriodValue } from '../../../../enum/stocks.enum';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  public stockPickerForm: FormGroup;
  public symbol: string;
  public period: string;
  public fieldLables = STOCK_FORM_LABEL;
  public placeHolder = PLACEHOLDERS;

  quotes$ = this.priceQuery.priceQueries$;


  timePeriods = [
    { viewValue: Period.VIEW_VALUE_MAX, value: PeriodValue.MAX },
    { viewValue: Period.VIEW_VALUE_FIVE_YEAR, value: PeriodValue.FIVE_YEAR },
    { viewValue: Period.VIEW_VALUE_FIVE_YEAR, value: PeriodValue.TWO_YEAR },
    { viewValue: Period.VIEW_VALUE_TWO_YEAR, value: PeriodValue.ONE_YEAR },
    { viewValue: Period.VIEW_VALUE_YEAR_TO_DATE, value: PeriodValue.YEAR_TO_DATE },
    { viewValue: Period.VIEW_VALUE_SIX_MONTHS, value: PeriodValue.SIX_MONTHS },
    { viewValue: Period.VIEW_VALUE_THREE_MONTHS, value: PeriodValue.THREE_MONTHS },
    { viewValue: Period.VIEW_VALUE_ONE_MONTH, value: PeriodValue.ONE_MONTH }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.stockPickerForm.valueChanges.pipe(debounceTime(DEBOUNCE_TIME.TIME)).subscribe(this.fetchQuote.bind(this));
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

}
