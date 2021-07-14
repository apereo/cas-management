import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {AcceptableUsagePolicyForm, MgmtFormGroup} from '@apereo/mgmt-lib/src/lib/form';


/**
 * Top level form group for displaying and updating basic options for a service.
 *
 * @author Ryan Mathis
 */
export class TabAcceptableUsagePolicyForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {
  get policy() {
    return this.get('acceptableUsagePolicy') as AcceptableUsagePolicyForm;
  }

  set policy(c: AcceptableUsagePolicyForm) {
    this.setControl('acceptableUsagePolicy', c);
  }

  constructor(public service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  reset(): void {
    this.policy = new AcceptableUsagePolicyForm(this.service.acceptableUsagePolicy);
  }

  map(service: AbstractRegisteredService) {
    service.acceptableUsagePolicy = this.policy.map();
  }
}
