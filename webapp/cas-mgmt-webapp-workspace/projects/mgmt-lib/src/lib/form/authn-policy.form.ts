import {FormControl, FormGroup} from '@angular/forms';
import {
  DefaultRegisteredServiceAuthenticationPolicy,
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
}





