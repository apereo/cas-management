import {Component, forwardRef, OnInit} from '@angular/core';
import {RegisteredServiceAccessStrategy} from '../../domain/access-strategy';
import {FormData} from '../../domain/form-data';
import {Util} from '../../util';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {ControlContainer, FormControl, NgForm} from '@angular/forms';
import {HasControls} from '../has-controls';

@Component({
  selector: 'lib-access-strategy',
  templateUrl: './access-strategy.component.html',
  styleUrls: ['./access-strategy.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => AccessStrategyComponent)
  }]
})
export class AccessStrategyComponent extends HasControls implements OnInit {

  formData: FormData;

  accessStrategy: RegisteredServiceAccessStrategy;
  original: RegisteredServiceAccessStrategy;
  sso: MgmtFormControl;
  requireAll: MgmtFormControl;
  unauthorizedUrl: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.accessStrategy = data.service.accessStrategy;
    this.formData = data.formData;
    this.original = data.original && data.original.accessStrategy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('ssoEnabled', this.sso);
    c.set('requireAllAttributes', this.requireAll);
    c.set('unauthorizedRedirectUrl', this.unauthorizedUrl);
    return c;
  }

  ngOnInit() {
    if (Util.isEmpty(this.accessStrategy.rejectedAttributes)) {
      this.accessStrategy.rejectedAttributes = new Map();
    }

    if (Util.isEmpty(this.accessStrategy.requiredAttributes)) {
      this.accessStrategy.requiredAttributes = new Map();
    }
    const og: any = this.original ? this.original : {};
    this.sso = new MgmtFormControl(this.accessStrategy.ssoEnabled, og.ssoEnabled);
    this.requireAll = new MgmtFormControl(this.accessStrategy.requireAllAttributes, og.requireAllAttributes);
    this.unauthorizedUrl = new MgmtFormControl(this.accessStrategy.unauthorizedRedirectUrl, og.unauthorizedRedirectUrl);
  }

}
