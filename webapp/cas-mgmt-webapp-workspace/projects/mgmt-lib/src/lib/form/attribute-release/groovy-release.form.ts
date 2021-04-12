import {AttributeReleaseForm} from './attribute-release.form';
import {FormControl, Validators} from '@angular/forms';
import {GroovyScriptAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';
import {require} from 'ace-builds';

/**
 * Form that extends Attribute Release Form and adds Groovy attribute.
 *
 * @author Travis Schmidt
 */
export class GroovyReleaseForm extends AttributeReleaseForm {

  get script() { return this.get('script') as FormControl; }

  constructor(policy: GroovyScriptAttributeReleasePolicy) {
    super(policy);
    this.addControl('script', new FormControl(policy?.groovyScript, Validators.required));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param policy - GroovyScriptAttributeReleasePolicy
   */
  map(policy: GroovyScriptAttributeReleasePolicy) {
    super.map(policy);
    policy.groovyScript = this.script.value;
  }
}
