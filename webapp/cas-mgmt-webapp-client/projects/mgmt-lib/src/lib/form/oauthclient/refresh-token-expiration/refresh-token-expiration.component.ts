import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-refresh-token-expiration',
  templateUrl: './refresh-token-expiration.component.html'
})
export class RefreshTokenExpirationComponent implements OnInit {

  @Input()
  control: FormGroup;
  timeToKill: MgmtFormControl;

  constructor() { }

  ngOnInit() {
    this.timeToKill = this.control.get('timeToKill') as MgmtFormControl;
  }

}
