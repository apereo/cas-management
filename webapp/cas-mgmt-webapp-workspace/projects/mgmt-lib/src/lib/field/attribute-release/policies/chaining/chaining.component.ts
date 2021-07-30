import { Component, Input, OnChanges } from '@angular/core';
import { ChainingForm } from '@apereo/mgmt-lib/src/lib/form';
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

    @Input()
    form: ChainingForm;

    @Input()
    types: {value: number, display: string}[]

    constructor() {
    }

    ngOnChanges() {
        console.log(this.form);
    }

    addPolicy() {
        // this.form.policies.push();
    }
}
