import {FormGroup} from '@angular/forms';
import {RegisteredServiceAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class ChecksForm extends FormGroup {
  get excludeDefaultAttributes() { return this.get('excludeDefaultAttributes') as MgmtFormControl; }
  get authorizedToReleaseCredentialPassword() { return this.get('authorizedToReleaseCredentialPassword') as MgmtFormControl; }
  get authorizedToReleaseProxyGrantingTicket() { return this.get('authorizedToReleaseProxyGrantingTicket') as MgmtFormControl; }
  get authorizedToReleaseAuthenticationAttributes() { return this.get('authorizedToReleaseAuthenticationAttributes') as MgmtFormControl; }
  get principalIdAttribute() { return this.get('principalIdAttribute') as MgmtFormControl; }

  constructor(policy: RegisteredServiceAttributeReleasePolicy) {
    super({
      excludeDefaultAttributes: new MgmtFormControl(policy && policy.excludeDefaultAttributes),
      authorizedToReleaseCredentialPassword: new MgmtFormControl(policy && policy.authorizedToReleaseCredentialPassword),
      authorizedToReleaseProxyGrantingTicket: new MgmtFormControl(policy && policy.authorizedToReleaseProxyGrantingTicket),
      authorizedToReleaseAuthenticationAttributes: new MgmtFormControl(policy && policy.authorizedToReleaseAuthenticationAttributes),
      principalIdAttribute: new MgmtFormControl(policy && policy.principalIdAttribute)
    });
  }

  mapForm(policy: RegisteredServiceAttributeReleasePolicy) {
    policy.excludeDefaultAttributes = this.excludeDefaultAttributes.value;
    policy.authorizedToReleaseCredentialPassword = this.authorizedToReleaseCredentialPassword.value;
    policy.authorizedToReleaseAuthenticationAttributes = this.authorizedToReleaseAuthenticationAttributes.value;
    policy.authorizedToReleaseProxyGrantingTicket = this.authorizedToReleaseProxyGrantingTicket.value;
    policy.principalIdAttribute = this.principalIdAttribute.value;
  }
}
