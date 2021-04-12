import {AttributeReleaseForm} from './attribute-release.form';
import {FormControl} from '@angular/forms';
import {GroovySamlRegisteredServiceAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form that extends Attribute Release form and adds Groovy Saml options.
 *
 * @author Travis Schmidt
 */
export class GroovySamlReleaseForm extends AttributeReleaseForm {

  get script() { return this.get('script') as FormControl; }

  constructor(policy: GroovySamlRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('script', new FormControl(policy?.groovyScript));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param policy - GroovySamlRegisteredServiceAttributeReleasePolicy
   */
  map(policy: GroovySamlRegisteredServiceAttributeReleasePolicy) {
    super.map(policy);
    policy.groovyScript = this.script.value;
  }
}
