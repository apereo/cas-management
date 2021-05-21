import { Component, Input } from '@angular/core';
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
export class ChainingComponent {

    // @Input()
    // form: ChainingReleaseForm;

    @Input()
    types: {value: number, display: string};

    constructor() {
    }

}
