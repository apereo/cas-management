import {DefaultRegisteredServiceMultifactorPolicy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {MfaForm} from '../mfa.form';

export class DefaultMfaForm extends MfaForm {

  get multifactorAuthenticationProviders() { return this.get('multifactorAuthenticationProviders') as MgmtFormControl; }
  get failureMode() { return this.get('failureMode') as MgmtFormControl; }
  get principalAttributeNameTrigger() { return this.get('principalAttributeNameTrigger') as MgmtFormControl; }
  get principalAttributeValueToMatch() { return this.get('principalAttributeValueToMatch') as MgmtFormControl; }
  get bypassEnabled() { return this.get('bypassEnabled') as MgmtFormControl; }
  get forceExecution() { return this.get('forceExecution') as MgmtFormControl; }
  get bypassTrustedDeviceEnabled() { return this.get('bypassTrustedDeviceEnabled') as MgmtFormControl; }

  constructor(policy: DefaultRegisteredServiceMultifactorPolicy) {
    super({
      multifactorAuthenticationProviders: new MgmtFormControl(policy && policy.multifactorAuthenticationProviders),
      failureMode: new MgmtFormControl(policy && policy.failureMode),
      principalAttributeNameTrigger: new MgmtFormControl(policy && policy.principalAttributeNameTrigger),
      principalAttributeValueToMatch: new MgmtFormControl(policy && policy.principalAttributeValueToMatch),
      bypassEnabled: new MgmtFormControl(policy && policy.bypassEnabled),
      forceExecution: new MgmtFormControl(policy && policy.forceExecution),
      bypassTrustedDeviceEnabled: new MgmtFormControl(policy && policy.bypassTrustedDeviceEnabled)
    });
  }

  mapForm(policy: DefaultRegisteredServiceMultifactorPolicy) {
    policy.multifactorAuthenticationProviders = this.multifactorAuthenticationProviders.value;
    policy.failureMode = this.failureMode.value;
    policy.principalAttributeNameTrigger = this.principalAttributeNameTrigger.value;
    policy.principalAttributeValueToMatch = this.principalAttributeValueToMatch.value;
    policy.bypassEnabled = this.bypassEnabled.value;
    policy.forceExecution = this.forceExecution.value;
    policy.bypassTrustedDeviceEnabled = this.bypassTrustedDeviceEnabled.value;
  }
}
