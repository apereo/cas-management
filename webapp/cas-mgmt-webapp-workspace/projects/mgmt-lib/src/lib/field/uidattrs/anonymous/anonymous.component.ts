import {Component, Input} from '@angular/core';
import {AnonymousUidForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update anonymous uid for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-anonymous',
  templateUrl: './anonymous.component.html'
})
export class AnonymousComponent {

  @Input()
  form: AnonymousUidForm;

  constructor(public config: AppConfigService) {
  }

}
