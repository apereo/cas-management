import {Component, Input} from '@angular/core';
import {PublicKeyForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update Public Key for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-pubkey',
  templateUrl: './pubkey.component.html'
})
export class PubkeyComponent {

  @Input()
  control: PublicKeyForm;

}
