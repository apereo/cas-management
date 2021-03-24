import {Component, Input} from '@angular/core';
import {NameidForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update SAML Name ID options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-nameid',
  templateUrl: './nameid.component.html'
})
export class SamlNameidComponent {

  @Input()
  form: NameidForm;

  constructor(public config: AppConfigService) {
  }

}
