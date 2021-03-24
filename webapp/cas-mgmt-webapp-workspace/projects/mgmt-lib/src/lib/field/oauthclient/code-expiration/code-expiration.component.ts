import {Component, Input} from '@angular/core';
import {CodeExpirationForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component for display/update for Access code expiration.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-code-expiration',
  templateUrl: './code-expiration.component.html'
})
export class CodeExpirationComponent {

  @Input()
  form: CodeExpirationForm;

}
