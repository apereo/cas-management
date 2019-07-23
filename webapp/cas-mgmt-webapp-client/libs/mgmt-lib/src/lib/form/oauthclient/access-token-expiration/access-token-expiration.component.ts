import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-access-token-expiration',
  templateUrl: './access-token-expiration.component.html'
})
export class AccessTokenExpirationComponent implements OnInit {

  @Input()
  control: FormGroup;
  maxTimeToLive: MgmtFormControl;
  timeToKill: MgmtFormControl;


  constructor() { }

  ngOnInit() {
    this.maxTimeToLive = this.control.get('maxTimeToLive') as MgmtFormControl;
    this.timeToKill = this.control.get('timeToKill') as MgmtFormControl;
  }

}
