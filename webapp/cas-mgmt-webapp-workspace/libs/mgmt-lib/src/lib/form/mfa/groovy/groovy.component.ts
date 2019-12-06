import {Component, Input, OnInit} from '@angular/core';
import {GroovyMfaForm} from './groovy.form';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html'
})
export class GroovyComponent implements OnInit {

  @Input()
  form: GroovyMfaForm;

  constructor() {
  }

  ngOnInit() {
  }

}
