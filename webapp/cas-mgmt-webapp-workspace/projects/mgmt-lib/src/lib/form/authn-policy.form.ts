import {FormControl, FormGroup} from '@angular/forms';
import {
  AllowedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria,
  CriteriaType,
  DefaultRegisteredServiceAuthenticationPolicy,
  ExcludedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria,
  RegisteredServiceAuthenticationPolicy,
} from '@apereo/mgmt-lib/src/lib/model';

export class AuthenticationPolicyForm extends FormGroup {
  get requiredAuthenticationHandlers() { return this.get('requiredAuthenticationHandlers') as FormControl; }

  get excludedAuthenticationHandlers() { return this.get('excludedAuthenticationHandlers') as FormControl; }

  get authenticationCriteria() { return this.get('authenticationCriteria') as FormControl; }

  constructor(policy: DefaultRegisteredServiceAuthenticationPolicy) {
    super({
      requiredAuthenticationHandlers: new FormControl(policy?.requiredAuthenticationHandlers),
      excludedAuthenticationHandlers: new FormControl(policy?.excludedAuthenticationHandlers),
      authenticationCriteria: new FormControl(AuthenticationPolicyForm.toPolicy(policy))
    });

  }

  map(): RegisteredServiceAuthenticationPolicy {
    const p = new DefaultRegisteredServiceAuthenticationPolicy();
    switch (this.authenticationCriteria.value) {
      case CriteriaType.ALLOWED_AUTHN_HANDLERS:
        p.requiredAuthenticationHandlers = this.requiredAuthenticationHandlers.value;
        p.excludedAuthenticationHandlers = [];
        p.criteria = new AllowedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria();
        break;
      case CriteriaType.EXCLUDED_AUTHN_HANDLERS:
        p.excludedAuthenticationHandlers = this.excludedAuthenticationHandlers.value;
        p.requiredAuthenticationHandlers = [];
        p.criteria = new ExcludedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria();
        break;
    }
    return p;
  }

  static toPolicy(policy: DefaultRegisteredServiceAuthenticationPolicy): CriteriaType {
    if (AllowedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria.instanceOf(policy?.criteria)) {
      return CriteriaType.ALLOWED_AUTHN_HANDLERS;
    }
    if (ExcludedAuthenticationHandlersRegisteredServiceAuthenticationPolicyCriteria.instanceOf(policy?.criteria)) {
      return CriteriaType.EXCLUDED_AUTHN_HANDLERS;
    }
    return null;
  }
}





