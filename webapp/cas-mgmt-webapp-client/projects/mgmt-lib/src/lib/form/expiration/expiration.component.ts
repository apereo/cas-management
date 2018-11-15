import { Component, OnInit } from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-expiration',
  templateUrl: './expiration.component.html',
  styleUrls: ['./expiration.component.css']
})
export class ExpirationComponent implements OnInit {

  expirationDate: MgmtFormControl;
  deleteWhenExpired: MgmtFormControl;
  notifyWhenDeleted: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.expirationDate = new MgmtFormControl(this.data.service.expirationPolicy.expirationDate,
      this.data.original.expirationPolicy.expirationDate);
    this.deleteWhenExpired = new MgmtFormControl(this.data.service.expirationPolicy.deleteWhenExpired,
      this.data.original.expirationPolicy.deleteWhenExpired);
    this.notifyWhenDeleted = new MgmtFormControl(this.data.service.expirationPolicy.notifyWhenDeleted,
      this.data.original.expirationPolicy.notifyWhenDeleted);
  }

}
