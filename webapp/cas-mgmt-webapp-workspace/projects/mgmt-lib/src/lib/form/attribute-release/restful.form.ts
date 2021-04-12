import {AttributeReleaseForm} from './attribute-release.form';
import {FormControl} from '@angular/forms';
import {ReturnRestfulAttributeReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form that extends Attribute Release Form and add remote endpoint.
 *
 * @author Travis Schmidt
 */
export class RestfulReleseForm extends AttributeReleaseForm {

  get endpoint() { return this.get('endpoint') as FormControl; }

  constructor(policy: ReturnRestfulAttributeReleasePolicy) {
    super(policy);
    this.addControl('endpoint', new FormControl(policy?.endpoint));
  }

  /**
   * Maps form values to the passed DTO.
   *
   * @param policy - ReturnRestfulAttributeReleasePolicy
   */
  map(policy: ReturnRestfulAttributeReleasePolicy) {
    super.map(policy);
    policy.endpoint = this.endpoint.value;
  }
}
