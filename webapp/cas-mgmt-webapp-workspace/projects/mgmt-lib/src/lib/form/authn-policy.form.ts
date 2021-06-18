import {FormControl, FormGroup} from '@angular/forms';
import {
  DefaultRegisteredServiceAuthenticationPolicy, RegisteredServiceAuthenticationPolicy,
} from '@apereo/mgmt-lib/src/lib/model';

export class AuthenticationPolicyForm extends FormGroup {
  get requiredAuthenticationHandlers() { return this.get('requiredAuthenticationHandlers') as FormControl; }

  get excludedAuthenticationHandlers() { return this.get('excludedAuthenticationHandlers') as FormControl; }

  constructor(policy: DefaultRegisteredServiceAuthenticationPolicy) {
    super({
      requiredAuthenticationHandlers: new FormControl(policy?.requiredAuthenticationHandlers),
      excludedAuthenticationHandlers: new FormControl(policy?.excludedAuthenticationHandlers)
    });
  }

  map(): RegisteredServiceAuthenticationPolicy {
    const p = new DefaultRegisteredServiceAuthenticationPolicy();
    p.excludedAuthenticationHandlers = this.excludedAuthenticationHandlers.value;
    p.requiredAuthenticationHandlers = this.requiredAuthenticationHandlers.value;
    return p;
  }
}





