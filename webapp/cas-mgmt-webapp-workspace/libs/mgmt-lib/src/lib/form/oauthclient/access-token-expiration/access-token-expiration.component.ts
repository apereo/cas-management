import {Component, Input, OnInit} from '@angular/core';
import {AccessTokenExpirationForm} from './access-token-expiration.form';

@Component({
  selector: 'lib-access-token-expiration',
  templateUrl: './access-token-expiration.component.html'
})
export class AccessTokenExpirationComponent implements OnInit {

  @Input()
  form: AccessTokenExpirationForm;

  constructor() { }

  ngOnInit() {
  }

}
