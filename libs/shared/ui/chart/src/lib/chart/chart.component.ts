import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CHART } from '../../../constant/chart.constant';
import { ChartTypes } from '../../../enum/chart.enum';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data$: Observable<any>;
  @Input() fromDate:string;
  @Input() toDate:string;
  public subscription: Subscription;

  chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };
  constructor() {}

  ngOnInit() {

    this.chart = {
      title: '',
      type: ChartTypes.LINE_CHART,
      data: [],
      columnNames: [CHART.PERIOD_TEXT, CHART.CLOSE_TEXT],
      options: { title: CHART.CHART_TITLE, width: CHART.WIDTH, height: CHART.HEIGHT }
    };
    
  }

  ngOnChanges() {
    this.subscription = this.data$.subscribe(filteredData => {
      this.chart.data = filteredData;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
