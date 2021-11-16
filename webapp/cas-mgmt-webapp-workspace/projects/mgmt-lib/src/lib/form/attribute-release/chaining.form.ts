import { FormArray } from '@angular/forms';
import { AttributeReleaseForm } from './attribute-release.form';
import { ChainingAttributeReleasePolicy } from '@apereo/mgmt-lib/src/lib/model';
import { ChainedPolicyForm } from './chained-policy.form';

/**
 * Form group to display and update fields for Consent.
 *
 * @author Ryan Mathis
 */
export class ChainingForm extends AttributeReleaseForm {

    get policies() { return this.get('policies') as FormArray; }

    constructor(policy: ChainingAttributeReleasePolicy) {
        super(policy);
        const policies = policy?.policies?.map(p => new ChainedPolicyForm(p)) || [];
        this.addControl('policies', new FormArray(policies));
    }

    /**
     * Maps the form values to the passed DTO.
     *
     * @param policy - RegisteredServiceConsentPolicy
     */
    map(policy: ChainingAttributeReleasePolicy) {
        super.map(policy);
        policy.policies = this.policies?.controls?.map(( c: ChainedPolicyForm ) => c.map());
    }
}
