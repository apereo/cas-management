import {Component, Input} from '@angular/core';
import {OptionalForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update for optional SAML options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-optional',
  templateUrl: './optional.component.html'
})
export class SamlOptionalComponent {

  @Input()
  form: OptionalForm;

}
