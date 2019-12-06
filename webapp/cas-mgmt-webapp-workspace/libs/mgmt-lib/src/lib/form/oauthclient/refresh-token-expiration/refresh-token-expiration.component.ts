import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';
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
