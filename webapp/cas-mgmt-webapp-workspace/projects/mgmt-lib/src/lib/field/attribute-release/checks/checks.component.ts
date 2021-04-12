import {Component, Input} from '@angular/core';
import {ChecksForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display default attribute release options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-attribute-release-checks',
  templateUrl: './checks.component.html'
})
export class ChecksComponent {

  @Input()
  form: ChecksForm;

  constructor() {
  }

}
