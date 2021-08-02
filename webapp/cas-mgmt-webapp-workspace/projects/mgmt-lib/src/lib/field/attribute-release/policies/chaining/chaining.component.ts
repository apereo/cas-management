import { Component, Input, OnChanges } from '@angular/core';
import { attributeReleaseFactory } from '@apereo/mgmt-lib/src/lib/model';
import { ChainingForm, AttributeReleaseForm } from '@apereo/mgmt-lib/src/lib/form';
// import { ChainingReleaseForm } from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display Groovy Attribute Release policy.
 *
 * @author Ryan Mathis
 */
@Component({
    selector: 'lib-chaining',
    templateUrl: './chaining.component.html'
})
export class ChainingComponent implements OnChanges {

    selectedPolicy: number;

    @Input()
    form: ChainingForm;

    @Input()
    types: {value: number, display: string}[]

    constructor() {
    }

    ngOnChanges() {
        //console.log(this.form);
    }

    addPolicy() {
        this.form.policies.push(new AttributeReleaseForm(attributeReleaseFactory()));
        console.log(this.form);
    }

    /**
   * Removed the selected poilicy from the chain.
   */
    removePolicy() {
        this.form.policies.removeAt(this.selectedPolicy);
    }

    /**
   * Moves the selected policy up the chain.
   */
    moveUp() {
        const index = this.selectedPolicy;
        const chain = this.form.policies;
        const up = chain.controls[index];
        chain.controls[index] = chain.controls[index - 1];
        chain.controls[index - 1] = up;
        chain.markAsTouched();
        chain.markAsDirty();
    }

    /**
     * Moves the selected policy down the chain.
     */
    moveDown() {
        const index = this.selectedPolicy;
        const chain = this.form.policies;
        const down = chain.controls[index];
        chain.controls[index] = chain.controls[index + 1];
        chain.controls[index + 1] = down;
        chain.markAsTouched();
        chain.markAsDirty();
    }
}
