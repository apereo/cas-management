import {Component, Input} from '@angular/core';
import { ConsentStatus } from '@apereo/mgmt-lib/src/lib/model';
import {ConsentForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update attribute release consent policies.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-attribute-release-consent',
  templateUrl: './consent.component.html'
})
export class ConsentComponent {

  @Input()
  form: ConsentForm;

  @Input()
  attributes: string[];

  STATUS_OPTIONS = ConsentStatus;

  constructor(public config: AppConfigService) {
  }

}
