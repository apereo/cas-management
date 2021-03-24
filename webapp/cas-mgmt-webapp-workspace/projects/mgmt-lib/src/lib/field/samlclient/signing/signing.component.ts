import {Component, Input} from '@angular/core';
import {SigningFrom} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update options for SAML signing of responses.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent {

  @Input()
  form: SigningFrom;

  constructor(public config: AppConfigService) { }

}
