import {Component, Input, OnInit} from '@angular/core';
import {GroovyUidForm} from './groovy.form';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html'
})
export class GroovyComponent implements OnInit {

  @Input()
  form: GroovyUidForm;

  constructor() {
  }

  ngOnInit() {
  }

}
