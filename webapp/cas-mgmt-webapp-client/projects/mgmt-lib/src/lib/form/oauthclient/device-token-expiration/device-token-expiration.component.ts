import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-device-token-expiration',
  templateUrl: './device-token-expiration.component.html'
})
export class DeviceTokenExpirationComponent implements OnInit {

  @Input()
  control: FormGroup;
  timeToKill: MgmtFormControl;

  constructor() { }

  ngOnInit() {
    this.timeToKill = this.control.get('timeToKill') as MgmtFormControl;
  }

}
