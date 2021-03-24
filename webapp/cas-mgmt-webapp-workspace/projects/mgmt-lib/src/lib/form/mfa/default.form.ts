import {DefaultRegisteredServiceMultifactorPolicy} from '@apereo/mgmt-lib/src/lib/model';
import {MfaForm} from './mfa.form';
import {FormControl} from '@angular/forms';

/**
 * Form group for displaying and updating a Default MFA policy.
 *
 * @author Travis Schmidt
 */
export class DefaultMfaForm extends MfaForm {

  get multifactorAuthenticationProviders() { return this.get('multifactorAuthenticationProviders') as FormControl; }
  get failureMode() { return this.get('failureMode') as FormControl; }
  get principalAttributeNameTrigger() { return this.get('principalAttributeNameTrigger') as FormControl; }
  get principalAttributeValueToMatch() { return this.get('principalAttributeValueToMatch') as FormControl; }
  get bypassEnabled() { return this.get('bypassEnabled') as FormControl; }
  get forceExecution() { return this.get('forceExecution') as FormControl; }
  get bypassTrustedDeviceEnabled() { return this.get('bypassTrustedDeviceEnabled') as FormControl; }

  constructor(policy: DefaultRegisteredServiceMultifactorPolicy) {
    super({
      multifactorAuthenticationProviders: new FormControl(policy?.multifactorAuthenticationProviders),
      failureMode: new FormControl(policy?.failureMode),
      principalAttributeNameTrigger: new FormControl(policy?.principalAttributeNameTrigger),
      principalAttributeValueToMatch: new FormControl(policy?.principalAttributeValueToMatch),
      bypassEnabled: new FormControl(policy?.bypassEnabled),
      forceExecution: new FormControl(policy?.forceExecution),
      bypassTrustedDeviceEnabled: new FormControl(policy?.bypassTrustedDeviceEnabled)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param policy -  DefaultRegisteredServiceMultifactorPolicy
   */
  map(policy: DefaultRegisteredServiceMultifactorPolicy) {
    policy.multifactorAuthenticationProviders = this.multifactorAuthenticationProviders.value;
    policy.failureMode = this.failureMode.value;
    policy.principalAttributeNameTrigger = this.principalAttributeNameTrigger.value;
    policy.principalAttributeValueToMatch = this.principalAttributeValueToMatch.value;
    policy.bypassEnabled = this.bypassEnabled.value;
    policy.forceExecution = this.forceExecution.value;
    policy.bypassTrustedDeviceEnabled = this.bypassTrustedDeviceEnabled.value;
  }
}
