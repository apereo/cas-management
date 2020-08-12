import {Component, Input, OnInit} from '@angular/core';
import {CodeExpirationForm} from './code-expiration.form';

@Component({
  selector: 'lib-code-expiration',
  templateUrl: './code-expiration.component.html'
})
export class CodeExpirationComponent implements OnInit {

  @Input()
  form: CodeExpirationForm;

  constructor() { }

  ngOnInit() {
  }

}
