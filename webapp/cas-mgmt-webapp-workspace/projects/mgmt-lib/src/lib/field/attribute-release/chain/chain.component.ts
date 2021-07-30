import { Component, Input } from '@angular/core';
import { ChainingForm } from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display default attribute release options.
 *
 * @author Ryan Mathis
 */
@Component({
    selector: 'lib-attribute-release-chain',
    templateUrl: './chain.component.html'
})
export class ChainComponent {

    @Input()
    form: ChainingForm;

    constructor() {
    }

}