import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-expiration',
  templateUrl: './expiration.component.html'
})
export class ExpirationComponent implements OnInit {

  @Input()
  control: FormGroup;
  expirationDate: MgmtFormControl;
  deleteWhenExpired: MgmtFormControl;
  notifyWhenDeleted: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.expirationDate = this.control.get('expirationDate') as MgmtFormControl;
    this.deleteWhenExpired = this.control.get('deleteWhenExpired') as MgmtFormControl;
    this.notifyWhenDeleted = this.control.get('notifyWhenDeleted') as MgmtFormControl;
  }

}
