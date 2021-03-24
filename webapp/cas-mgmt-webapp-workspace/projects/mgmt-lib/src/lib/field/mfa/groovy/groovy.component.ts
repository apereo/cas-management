import {Component, Input} from '@angular/core';
import {GroovyMfaForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update Groovy MFA policy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html'
})
export class GroovyComponent {

  @Input()
  form: GroovyMfaForm;

}
