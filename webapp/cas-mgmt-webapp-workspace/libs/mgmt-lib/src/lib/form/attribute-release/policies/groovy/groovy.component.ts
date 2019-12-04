import {Component, Input, OnInit} from '@angular/core';
import {GroovyReleaseForm} from './groovy.form';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html'
})
export class GroovyComponent implements OnInit {

  @Input()
  form: GroovyReleaseForm;

  constructor() {
  }

  ngOnInit() {
  }

}
