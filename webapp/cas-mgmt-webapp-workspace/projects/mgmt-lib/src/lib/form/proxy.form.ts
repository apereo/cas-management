import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  RefuseRegisteredServiceProxyPolicy,
  RegexMatchingRegisteredServiceProxyPolicy,
  RegisteredServiceProxyPolicy
} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Abstract base form group for Proxy Policies.
 */
export abstract class ProxyForm extends FormGroup {

  /**
   * Maps the form values to RegisteredServiceProxyPolicy.
   */
  abstract map(): RegisteredServiceProxyPolicy;
}

/**
 * Form group for displaying and updating RegExProxyPolicy.
 */
export class RegExProxyForm extends ProxyForm {

  get pattern() { return this.get('pattern') as FormControl; }

  constructor(policy: RegexMatchingRegisteredServiceProxyPolicy) {
    super({
      pattern: new FormControl(policy?.pattern, Validators.required)
    });
  }

  /**
   * Maps the form values to RegexMatchingRegisteredServiceProxyPolicy.
   */
  map(): RegexMatchingRegisteredServiceProxyPolicy {
    const p = new RegexMatchingRegisteredServiceProxyPolicy();
    p.pattern = this.pattern.value;
    return p;
  }
}

/**
 * Form group for displaying and updating RefuseProxyPolicy.
 */
export class RefuseProxyForm extends ProxyForm {

  constructor() {
    super({});
  }

  /**
   * Maps the form values to RefuseRegisteredServiceProxyPolicy.
   */
  map(): RefuseRegisteredServiceProxyPolicy {
    return new RefuseRegisteredServiceProxyPolicy();
  }
}
