import {Component, Input} from '@angular/core';
import {RefreshTokenExpirationForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update RefreshTokenExpirationPolicy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-refresh-token-expiration',
  templateUrl: './refresh-token-expiration.component.html'
})
export class RefreshTokenExpirationComponent {

  @Input()
  form: RefreshTokenExpirationForm;

}
