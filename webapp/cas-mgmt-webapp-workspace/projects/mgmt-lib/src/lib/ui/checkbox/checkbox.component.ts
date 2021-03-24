import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input()
  control: FormControl;

  @Input()
  toolTip: string;

  @Input()
  label: string;


  constructor() { }

  ngOnInit(): void {
  }

}
