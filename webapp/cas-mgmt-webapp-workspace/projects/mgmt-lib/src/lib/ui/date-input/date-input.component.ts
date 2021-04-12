import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit {

  @Input()
  control: FormControl;

  @Input()
  toolTip: string;

  @Input()
  label: string;

  @Input()
  required = false;

  @Input()
  errors: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
