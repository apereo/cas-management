import {FormGroup, Validators} from '@angular/forms';
import {RefuseRegisteredServiceProxyPolicy, RegexMatchingRegisteredServiceProxyPolicy, RegisteredServiceProxyPolicy} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export abstract class ProxyForm extends FormGroup {

  abstract mapForm(): RegisteredServiceProxyPolicy;
}

export class RegExProxyForm extends ProxyForm {

  get pattern() { return this.get('pattern') as MgmtFormControl; }

  constructor(policy: RegexMatchingRegisteredServiceProxyPolicy) {
    super({
      pattern: new MgmtFormControl(policy?.pattern, null, Validators.required)
    });
  }

  mapForm(): RegexMatchingRegisteredServiceProxyPolicy {
    const p = new RegexMatchingRegisteredServiceProxyPolicy();
    p.pattern = this.pattern.value;
    return p;
  }
}

export class RefuseProxyForm extends ProxyForm {

  constructor() {
    super({});
  }

  mapForm(): RefuseRegisteredServiceProxyPolicy {
    return new RefuseRegisteredServiceProxyPolicy();
  }
}
