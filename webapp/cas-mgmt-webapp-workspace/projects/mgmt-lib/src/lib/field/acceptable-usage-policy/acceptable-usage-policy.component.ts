import {Component, Input} from '@angular/core';
import {AcceptableUsagePolicyForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component used to manage Access Strategy policies for a service.
 *
 * @author Ryan Mathis
 */
@Component({
  selector: 'lib-acceptable-usage-policy',
  templateUrl: './acceptable-usage-policy.component.html'
})
export class AcceptableUsagePolicyComponent {

  @Input()
  form: AcceptableUsagePolicyForm;

  constructor() {
  }

}
