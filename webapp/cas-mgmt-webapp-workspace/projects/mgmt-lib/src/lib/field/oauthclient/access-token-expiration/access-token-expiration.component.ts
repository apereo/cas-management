import {Component, Input} from '@angular/core';
import {AccessTokenExpirationForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update access token expiration policy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-access-token-expiration',
  templateUrl: './access-token-expiration.component.html'
})
export class AccessTokenExpirationComponent {

  @Input()
  form: AccessTokenExpirationForm;

}
