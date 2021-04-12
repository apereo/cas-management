import {Component, Input} from '@angular/core';
import {OidcClientForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update options for an OidcClient.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-oidcclient',
  templateUrl: './oidcclient.component.html'
})
export class OidcclientComponent {

  @Input()
  form: OidcClientForm;

  constructor(public config: AppConfigService) {
  }

}
