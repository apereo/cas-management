import {FormControl, FormGroup} from '@angular/forms';
import {RegisteredServiceAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group to display and up date options for Attribute Release.
 *
 * @author Travis Schmidt
 */
export class ChecksForm extends FormGroup {

  get excludeDefaultAttributes() { return this.get('excludeDefaultAttributes') as FormControl; }
  get authorizedToReleaseCredentialPassword() { return this.get('authorizedToReleaseCredentialPassword') as FormControl; }
  get authorizedToReleaseProxyGrantingTicket() { return this.get('authorizedToReleaseProxyGrantingTicket') as FormControl; }
  get authorizedToReleaseAuthenticationAttributes() { return this.get('authorizedToReleaseAuthenticationAttributes') as FormControl; }
  get principalIdAttribute() { return this.get('principalIdAttribute') as FormControl; }

  constructor(policy: RegisteredServiceAttributeReleasePolicy) {
    super({
      excludeDefaultAttributes: new FormControl(policy?.excludeDefaultAttributes),
      authorizedToReleaseCredentialPassword: new FormControl(policy?.authorizedToReleaseCredentialPassword),
      authorizedToReleaseProxyGrantingTicket: new FormControl(policy?.authorizedToReleaseProxyGrantingTicket),
      authorizedToReleaseAuthenticationAttributes: new FormControl(policy?.authorizedToReleaseAuthenticationAttributes),
      principalIdAttribute: new FormControl(policy?.principalIdAttribute)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param policy - RegisteredServiceAttributeReleasePolicy
   */
  map(policy: RegisteredServiceAttributeReleasePolicy) {
    policy.excludeDefaultAttributes = this.excludeDefaultAttributes.value;
    policy.authorizedToReleaseCredentialPassword = this.authorizedToReleaseCredentialPassword.value;
    policy.authorizedToReleaseAuthenticationAttributes = this.authorizedToReleaseAuthenticationAttributes.value;
    policy.authorizedToReleaseProxyGrantingTicket = this.authorizedToReleaseProxyGrantingTicket.value;
    policy.principalIdAttribute = this.principalIdAttribute.value;
  }
}
