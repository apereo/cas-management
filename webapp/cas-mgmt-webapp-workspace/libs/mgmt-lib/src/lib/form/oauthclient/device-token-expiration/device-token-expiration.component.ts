import {Component, Input, OnInit} from '@angular/core';
import {DeviceTokenExpirationForm} from './device-token-expiration.form';

@Component({
  selector: 'lib-device-token-expiration',
  templateUrl: './device-token-expiration.component.html'
})
export class DeviceTokenExpirationComponent implements OnInit {

  @Input()
  form: DeviceTokenExpirationForm;

  constructor() { }

  ngOnInit() {
  }

}
