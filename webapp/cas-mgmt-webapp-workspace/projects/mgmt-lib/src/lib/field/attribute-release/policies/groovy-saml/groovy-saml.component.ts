import {Component, Input} from '@angular/core';
import {GroovySamlReleaseForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to diplay Groovy Saml Attribute Release policy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-groovy-saml',
  templateUrl: './groovy-saml.component.html'
})
export class GroovySamlComponent {

  @Input()
  form: GroovySamlReleaseForm;

  constructor() {
  }

}
