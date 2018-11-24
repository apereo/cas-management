import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {RegisteredServiceAccessStrategy} from '../../domain/access-strategy';
import {FormData} from '../../domain/form-data';
import {Util} from '../../util';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {FormControl} from '@angular/forms';
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

  @Input()
  data: RegisteredServiceAccessStrategy[];

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
    if (Util.isEmpty(this.data[0].rejectedAttributes)) {
      this.data[0].rejectedAttributes = new Map();
    }

    if (Util.isEmpty(this.data[0].requiredAttributes)) {
      this.data[0].requiredAttributes = new Map();
    }
    const og: any = this.data[1] ? this.data[1] : {};
    this.sso = new MgmtFormControl(this.data[0].ssoEnabled, og.ssoEnabled);
    this.requireAll = new MgmtFormControl(this.data[0].requireAllAttributes, og.requireAllAttributes);
    this.unauthorizedUrl = new MgmtFormControl(this.data[0].unauthorizedRedirectUrl, og.unauthorizedRedirectUrl);
  }

}
