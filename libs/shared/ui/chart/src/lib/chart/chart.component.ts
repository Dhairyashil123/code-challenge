import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { CHART } from '../../../constant/chart.constant';
import { ChartTypes } from '../../../enum/chart.enum';

@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: any;

  public chart: {
    title: string;
    type: string;
    data: any;
    columnNames: string[];
    options: any;
  };
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.chart = {
      title: '',
      type: ChartTypes.LINE_CHART,
      data: [],
      columnNames: [CHART.PERIOD_TEXT, CHART.CLOSE_TEXT],
      options: { title: CHART.CHART_TITLE, width: CHART.WIDTH, height: CHART.HEIGHT }
    };
  }
}
