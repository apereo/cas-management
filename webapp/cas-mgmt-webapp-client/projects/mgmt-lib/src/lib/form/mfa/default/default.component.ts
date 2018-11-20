import {Component, forwardRef, OnInit} from '@angular/core';
import {DefaultRegisteredServiceMultifactorPolicy} from '../../../domain/multifactor';
import {FormData} from '../../../domain/form-data';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => DefaultComponent)
  }]
})
export class DefaultComponent extends HasControls implements OnInit {

  policy: DefaultRegisteredServiceMultifactorPolicy;
  original: DefaultRegisteredServiceMultifactorPolicy;
  formData: FormData;

  multifactorAuthenticationProviders: MgmtFormControl;
  failureMode: MgmtFormControl;
  principalAttributeNameTrigger: MgmtFormControl;
  principalAttributeValueToMatch: MgmtFormControl;
  bypassEnabled: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.multifactorPolicy as DefaultRegisteredServiceMultifactorPolicy;
    this.original = data.original && data.original.multifactorPolicy as DefaultRegisteredServiceMultifactorPolicy;
    this.formData = data.formData;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('multifactorAuthenticaitonProviders', this.multifactorAuthenticationProviders);
    c.set('failureMode', this.failureMode);
    c.set('principalAttributeNameTrigger', this.principalAttributeNameTrigger);
    c.set('principalAttributeValureToMatch', this.principalAttributeValueToMatch);
    c.set('bypassEnabled', this.bypassEnabled);
    return c;
  }

  ngOnInit() {
    const og: any = this.data.original ? this.data.original : {};
    this.multifactorAuthenticationProviders = new MgmtFormControl(this.policy.multifactorAuthenticationProviders,
      og.multifactorAuthenticationProviders);
    this.failureMode = new MgmtFormControl(this.policy.failureMode, og.failureMode);
    this.principalAttributeNameTrigger = new MgmtFormControl(this.policy.principalAttributeNameTrigger, og.principalAttributeNameTrigger);
    this.principalAttributeValueToMatch = new MgmtFormControl(this.policy.principalAttributeValueToMatch,
      og.principalAttributeValueToMatch);
    this.bypassEnabled = new MgmtFormControl(this.policy.bypassEnabled, og.bypassEnabled);

  }

}
