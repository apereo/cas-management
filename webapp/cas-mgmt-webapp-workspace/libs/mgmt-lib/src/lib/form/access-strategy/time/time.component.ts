import {Component, Input, OnInit} from '@angular/core';
import {TimeForm} from './time.form';

@Component({
  selector: 'lib-time',
  templateUrl: './time.component.html'
})
export class TimeComponent implements OnInit {

  @Input()
  form: TimeForm;

  constructor() {
  }

  ngOnInit() {
  }

}
