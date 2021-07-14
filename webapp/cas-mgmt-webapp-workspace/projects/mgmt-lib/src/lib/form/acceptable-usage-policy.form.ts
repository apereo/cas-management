import { FormControl, FormGroup } from '@angular/forms';
import { AbstractRegisteredService, DefaultRegisteredServiceAcceptableUsagePolicy } from '@apereo/mgmt-lib/src/lib/model';
import {
    RegisteredServiceAcceptableUsagePolicy
} from '@apereo/mgmt-lib/src/lib/model';
/**
 * Top level form group for displaying and updating basic options for a service.
 *
 * @author Ryan Mathis
 */
export class AcceptableUsagePolicyForm extends FormGroup {

    get policyEnabled() { return this.get('policyEnabled') as FormControl; }
    get messageCode() { return this.get('messageCode') as FormControl; }
    get text() { return this.get('text') as FormControl; }

    constructor(private policy: DefaultRegisteredServiceAcceptableUsagePolicy) {
        super({
            policyEnabled: new FormControl(policy?.enabled),
            messageCode: new FormControl(policy?.messageCode),
            text: new FormControl(policy?.text)
        });
    }

    /**
     * Maps the form values to the passed service.
     *
     * @param service - AbstractRegisteredService
     */
    map(): RegisteredServiceAcceptableUsagePolicy {
        const policy = new DefaultRegisteredServiceAcceptableUsagePolicy();
        policy.enabled = this.policyEnabled.value;
        policy.messageCode = this.messageCode.value;
        policy.text = this.text.value;
        return policy;
    }
}
