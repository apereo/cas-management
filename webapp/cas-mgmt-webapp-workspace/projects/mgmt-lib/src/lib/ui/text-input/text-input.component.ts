import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {

  @Input()
  control: FormControl;

  @Input()
  toolTip: string;

  @Input()
  label: string;

  @Input()
  required = false;

  @Input()
  autoOptions: string[];

  @Input()
  errors: any[];

  @Input()
  pattern: string;

  @Input()
  type = 'text';

  constructor() { }

}
