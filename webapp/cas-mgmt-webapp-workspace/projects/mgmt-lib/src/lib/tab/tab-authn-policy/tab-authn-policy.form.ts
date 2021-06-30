import {FormGroup} from '@angular/forms';
import {AuthenticationPolicyForm, MgmtFormGroup} from '@apereo/mgmt-lib/src/lib/form';
import {AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

export class TabAuthnPolicyForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get policy() {
    return this.get('policy') as AuthenticationPolicyForm;
  }

  set policy(c: AuthenticationPolicyForm) {
    this.setControl('policy', c);
  }

  constructor(public service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  reset(): void {
    this.policy = new AuthenticationPolicyForm(this.service.authenticationPolicy);
  }

  map(service: AbstractRegisteredService) {
    service.authenticationPolicy = this.policy.map();
  }
}
