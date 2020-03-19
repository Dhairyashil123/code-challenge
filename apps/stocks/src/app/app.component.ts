import { Component } from '@angular/core';
import { APP_CONST } from '../../../constants/app.constant';

@Component({
  selector: 'coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appConstant = APP_CONST;
  public title: string = APP_CONST.TITLE;
}
