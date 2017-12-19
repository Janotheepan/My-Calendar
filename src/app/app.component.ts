import {Component, OnInit} from '@angular/core';
// import { AppState } from './app.service';
import * as moment from 'moment' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public date = moment();
  public  daysArr;
  constructor() {}

  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
  }
  public todayCheck(day) {
    if(!day){
      return false;
    }
    return moment().format('L') === day.format('L');
  }
  public createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, {length: month.daysInMonth()})
      .map(Number.call, Number)
      .map((n) => {
        return moment(firstDay).add(n, 'd');
      });
    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }
    public nextMonth(){
      this.date.add(1, 'M');
      this.daysArr = this.createCalendar(this.date);
    }
    public previousMonth(){
      this.date.subtract(1, 'M');
      this.daysArr = this.createCalendar(this.date);
    }
}
