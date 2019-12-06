import {Component, Input, OnInit} from '@angular/core';
import {RestfulReleseForm} from './restful.form';

@Component({
  selector: 'lib-restful',
  templateUrl: './restful.component.html'
})
export class RestfulComponent implements OnInit {

  @Input()
  form: RestfulReleseForm;

  constructor() {
  }

  ngOnInit() {
  }

}
