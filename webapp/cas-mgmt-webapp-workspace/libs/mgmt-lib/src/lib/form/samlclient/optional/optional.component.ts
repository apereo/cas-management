import {Component, Input, OnInit} from '@angular/core';
import {OptionalForm} from './optional.form';

@Component({
  selector: 'lib-optional',
  templateUrl: './optional.component.html'
})
export class SamlOptionalComponent implements OnInit {

  @Input()
  form: OptionalForm;

  constructor() {
  }

  ngOnInit() {
  }

}
