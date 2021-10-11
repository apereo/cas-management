import { Component, Input } from '@angular/core';
import { ChainedPolicyForm } from '@apereo/mgmt-lib/src/lib/form';
import { PoliciesComponent } from '../policies.component';

/**
 * Component to display and handle Attribute Release policies for a service.
 *
 * @author Ryan Mathis
 */
@Component({
    selector: 'lib-chained-attribute-release-policies',
    templateUrl: './chained-policy.component.html',
    styleUrls: ['./chained-policy.component.css']
})
export class ChainedPoliciesComponent extends PoliciesComponent {

    @Input()
    policy: ChainedPolicyForm;

    types = [
        ...this.chainableTypes
    ];

}