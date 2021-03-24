import {Component, Input} from '@angular/core';
import {DefaultMfaForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component for displaying/updating Default MFA policy for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-default',
  templateUrl: './default.component.html'
})
export class DefaultComponent {

  @Input()
  form: DefaultMfaForm;

  constructor(public config: AppConfigService) {
  }

}
