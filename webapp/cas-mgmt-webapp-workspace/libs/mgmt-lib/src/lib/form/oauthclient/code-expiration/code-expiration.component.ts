import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';
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
