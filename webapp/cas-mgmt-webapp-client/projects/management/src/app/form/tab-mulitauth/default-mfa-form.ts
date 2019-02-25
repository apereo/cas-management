import {
  DefaultRegisteredServiceMultifactorPolicy,
  MgmtFormControl
} from 'mgmt-lib';
import {BaseMfaForm} from './base-mfa-form';

export class DefaultMFAForm extends BaseMfaForm<DefaultRegisteredServiceMultifactorPolicy> {

  constructor(public policy: DefaultRegisteredServiceMultifactorPolicy) {
    super(policy);
    this.addControl('multifactorAuthenticationProviders', new MgmtFormControl(null));
    this.addControl('failureMode', new MgmtFormControl(null));
    this.addControl('principalAttributeNameTrigger', new MgmtFormControl(null));
    this.addControl('principalAttributeValueToMatch', new MgmtFormControl(null));
    this.addControl('bypassEnabled', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      multifactorAuthenticationProviders: this.policy.multifactorAuthenticationProviders,
      failureMode: this.policy.failureMode,
      principalAttributeNameTrigger: this.policy.principalAttributeNameTrigger,
      principalAttributeValueToMatch: this.policy.principalAttributeValueToMatch,
      bypassEnabled: this.policy.bypassEnabled
    };
  }

  mapForm(policy: DefaultRegisteredServiceMultifactorPolicy) {
    const frm = this.value;
    policy.multifactorAuthenticationProviders = frm.multifactorAuthenticationProviders;
    policy.failureMode = frm.failureMode;
    policy.principalAttributeNameTrigger = frm.principalAttributeNameTrigger;
    policy.principalAttributeValueToMatch = frm.principalAttributeValueToMatch;
    policy.bypassEnabled = frm.bypassEnabled;
  }

}
