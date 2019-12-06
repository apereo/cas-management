import {Component, Input, OnInit} from '@angular/core';
import {GroovySamlReleaseForm} from './groovy-saml.form';

@Component({
  selector: 'lib-groovy-saml',
  templateUrl: './groovy-saml.component.html'
})
export class GroovySamlComponent implements OnInit {

  @Input()
  form: GroovySamlReleaseForm;

  constructor() {
  }

  ngOnInit() {
  }

}
