import {Component, Input} from '@angular/core';
import {DeviceTokenExpirationForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update DeviceTokenExpirationPolicy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-device-token-expiration',
  templateUrl: './device-token-expiration.component.html'
})
export class DeviceTokenExpirationComponent {

  @Input()
  form: DeviceTokenExpirationForm;

}
