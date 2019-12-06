import {Component, Input, OnInit} from '@angular/core';
import {ChecksForm} from './checks.form';

@Component({
  selector: 'lib-attribute-release-checks',
  templateUrl: './checks.component.html'
})
export class ChecksComponent implements OnInit {

  @Input()
  form: ChecksForm;

  constructor() {
  }

  ngOnInit() {
  }

}
