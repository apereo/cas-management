import {FormControl, FormGroup} from '@angular/forms';
import {delegatedAuthenticationPolicyFactory, RegisteredServiceDelegatedAuthenticationPolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating delegated authentication policies.
 *
 * @author Travis Schmidt
 */
export class DelegatedForm extends FormGroup {

  get allowedProviders() { return this.get('allowedProviders') as FormControl; }
  get permitUndefined() { return this.get('permitUndefined') as FormControl; }
  get exclusive() { return this.get('exclusive') as FormControl; }

  constructor(policy: RegisteredServiceDelegatedAuthenticationPolicy) {
    super({
      allowedProviders: new FormControl(policy?.allowedProviders),
      permitUndefined: new FormControl(policy?.permitUndefined),
      exclusive: new FormControl(policy?.exclusive)
    });
  }

  /**
   * Maps form values to the passed DTO.
   *
   * @param policy - RegisteredServiceDelegatedAuthenticationPolicy
   */
  map(policy: RegisteredServiceDelegatedAuthenticationPolicy = delegatedAuthenticationPolicyFactory({}) as RegisteredServiceDelegatedAuthenticationPolicy): RegisteredServiceDelegatedAuthenticationPolicy {
    policy.allowedProviders = this.allowedProviders.value;
    policy.permitUndefined = this.permitUndefined.value;
    policy.exclusive = this.exclusive.value;
    return policy;
  }

}
