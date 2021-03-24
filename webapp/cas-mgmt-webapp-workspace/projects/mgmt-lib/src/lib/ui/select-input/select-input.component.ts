import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent implements OnInit {

  @Input()
  control: FormControl;

  @Input()
  toolTip: string;

  @Input()
  label: string;

  @Input()
  options: string[];

  @Input()
  valueOptions: any[];

  @Input()
  required = false;

  @Input()
  multiple = false;

  @Input()
  errors: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
