import {Component, Input, OnInit} from '@angular/core';
import {RefreshTokenExpirationForm} from './refresh-token-expiration.form';

@Component({
  selector: 'lib-refresh-token-expiration',
  templateUrl: './refresh-token-expiration.component.html'
})
export class RefreshTokenExpirationComponent implements OnInit {

  @Input()
  form: RefreshTokenExpirationForm;

  constructor() { }

  ngOnInit() {
  }

}
