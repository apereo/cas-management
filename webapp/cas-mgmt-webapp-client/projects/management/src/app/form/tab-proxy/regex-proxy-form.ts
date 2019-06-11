import {
  RegexMatchingRegisteredServiceProxyPolicy,
  MgmtFormGroup,
  MgmtFormControl
} from 'mgmt-lib';
import {FormGroup, Validators} from '@angular/forms';

export class RegexProxyForm extends FormGroup implements MgmtFormGroup<RegexMatchingRegisteredServiceProxyPolicy> {

  constructor(public policy: RegexMatchingRegisteredServiceProxyPolicy) {
    super({
      regex: new MgmtFormControl(null, null, Validators.required)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      regex: this.policy.pattern
    };
  }

  mapForm(policy: RegexMatchingRegisteredServiceProxyPolicy) {
    policy.pattern = this.value.regex;
  }
}
