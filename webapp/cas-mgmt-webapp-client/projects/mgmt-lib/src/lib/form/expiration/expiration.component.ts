import {Component, forwardRef, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {DefaultRegisteredServiceExpirationPolicy} from '../../domain/expiration';
import {HasControls} from '../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-expiration',
  templateUrl: './expiration.component.html',
  styleUrls: ['./expiration.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ExpirationComponent)
  }]
})
export class ExpirationComponent extends HasControls implements OnInit {

  policy: DefaultRegisteredServiceExpirationPolicy;
  original: DefaultRegisteredServiceExpirationPolicy;
  expirationDate: MgmtFormControl;
  deleteWhenExpired: MgmtFormControl;
  notifyWhenDeleted: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.expirationPolicy;
    this.original = data.original && data.original.expirationPolicy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('expirationDate', this.expirationDate);
    c.set('deleteWhenExpired', this.deleteWhenExpired);
    c.set('notifyWhenDeleted', this.notifyWhenDeleted);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.expirationDate = new MgmtFormControl(this.policy.expirationDate, og.expirationDate);
    this.deleteWhenExpired = new MgmtFormControl(this.policy.deleteWhenExpired, og.deleteWhenExpired);
    this.notifyWhenDeleted = new MgmtFormControl(this.policy.notifyWhenDeleted, og.notifyWhenDeleted);
  }

}
