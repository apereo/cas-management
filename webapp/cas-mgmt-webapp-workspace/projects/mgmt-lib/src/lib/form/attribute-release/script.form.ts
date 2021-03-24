import {AttributeReleaseForm} from './attribute-release.form';
import {FormControl} from '@angular/forms';
import {ScriptedRegisteredServiceAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form that extends Attribute Release form and adds script attribute.
 *
 * @author Travis Schmidt
 */
export class ScriptReleaseForm extends AttributeReleaseForm {

  get script() { return this.get('script') as FormControl; }

  constructor(policy: ScriptedRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('script', new FormControl(policy?.scriptFile));
  }

  /**
   * Map form values to the passed DTO.
   *
   * @param policy - ScriptedRegisteredServiceAttributeReleasePolicy
   */
  map(policy: ScriptedRegisteredServiceAttributeReleasePolicy) {
    super.map(policy);
    policy.scriptFile = this.script.value;
  }
}
