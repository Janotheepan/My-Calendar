import {Component, OnInit} from '@angular/core';
// import { AppState } from './app.service';
import * as moment from 'moment' ;
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {isNull} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public date = moment();
  public dateForm: FormGroup;
  public isReserved;
  public  daysArr;
  constructor(private fb: FormBuilder) {
    this.initDateForm();
  }
  public initDateForm() {
    return this.dateForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    });
  }
  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
  }
  public todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }
  public reserve() {
    if (!this.dateForm.valid) {
      return;
    }
    const dateFrom = this.dateForm.value.dateFrom;
    const dateTo = this.dateForm.value.dateTo;
    this.isReserved = 'Reserved from ' + (dateFrom) + ' to ' + (dateTo);
  }
  public createCalendar(month) {
    const firstDay = moment(month).startOf('M');
    const days = Array.apply(null, { length: month.daysInMonth()})
      .map(Number.call, Number)
      .map((n) => {
        return moment(firstDay).add(n, 'd');
      });
    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }
    public nextMonth() {
      this.date.add(1, 'M');
      this.daysArr = this.createCalendar(this.date);
    }
    public previousMonth() {
      this.date.subtract(1, 'M');
      this.daysArr = this.createCalendar(this.date);
    }
    public isSelected(day) {
    if (!day) {
      return false;
    }
    const dateFrom = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
    const dateTo = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');
    if (this.dateForm.valid) {
      return dateFrom.isSameOrBefore(day) && dateTo.isSameOrAfter(day);
    }
    if (this.dateForm.get('dateFrom').valid) {
      return dateFrom.isSame(day);
    }
    }
    public selectedDate(day) {
    const dayFormatted = day.format('MM/DD/YYYY');
    if (this.dateForm.valid) {
      this.dateForm.setValue({dateFrom: null, dateTo: null});
    return;
    }
    if (!this.dateForm.get('dateFrom').value) {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
    } else {
      this.dateForm.get('dateTo').patchValue(dayFormatted);
    }
  }
}
