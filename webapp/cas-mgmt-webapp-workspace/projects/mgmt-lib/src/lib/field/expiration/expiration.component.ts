import {Component, Input} from '@angular/core';
import {ExpirationForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update expiration policy for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-expiration',
  templateUrl: './expiration.component.html'
})
export class ExpirationComponent {

  @Input()
  form: ExpirationForm;

}
