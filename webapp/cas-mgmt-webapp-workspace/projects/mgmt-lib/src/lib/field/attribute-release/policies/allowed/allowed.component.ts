import {Component, Input} from '@angular/core';
import {AllowedReleasedForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display options for Return Allowed Attribute Release.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-allowed',
  templateUrl: './allowed.component.html'
})
export class AllowedComponent {

  @Input()
  form: AllowedReleasedForm;

  constructor(public config: AppConfigService) {
  }

}


