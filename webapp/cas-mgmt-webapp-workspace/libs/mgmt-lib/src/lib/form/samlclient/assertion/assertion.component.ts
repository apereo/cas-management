import {Component, Input, OnInit} from '@angular/core';
import {AssertionForm} from './assertion.form';

@Component({
  selector: 'lib-assertion',
  templateUrl: './assertion.component.html',
  styleUrls: ['./assertion.component.css']
})
export class AssertionComponent implements OnInit {

  @Input()
  form: AssertionForm;

  constructor() {
  }

  ngOnInit() {
  }

}
