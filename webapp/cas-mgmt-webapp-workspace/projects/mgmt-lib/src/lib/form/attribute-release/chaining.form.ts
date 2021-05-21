import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RegisteredServiceAttributeReleasePolicy } from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group to display and update fields for Consent.
 *
 * @author Ryan Mathis
 */
export class ChainingForm extends FormGroup {

    get policies() { return this.get('policies') as FormArray; }

    constructor(policy: RegisteredServiceAttributeReleasePolicy[]) {
        super({
            policies: new FormArray([]),
        });
    }

    /**
     * Maps the form values to the passed DTO.
     *
     * @param policy - RegisteredServiceConsentPolicy
     */
    map(policies: RegisteredServiceAttributeReleasePolicy[]) {
        
    }
}
