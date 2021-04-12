import {RemoteEndpointServiceAccessStrategy} from '@apereo/mgmt-lib/src/lib/model';
import {AccessStrategyForm} from './access-strategy.form';
import {FormControl} from '@angular/forms';

/**
 * Form group that extends AccessStrategyForm to add RemoteEnpoint options.
 *
 * @author Travis Schmidt
 */
export class RemoteForm extends AccessStrategyForm {

  get endpointUrl() { return this.get('endpointUrl') as FormControl; }
  get responseCodes() { return this.get('responseCodes') as FormControl; }

  constructor(policy: RemoteEndpointServiceAccessStrategy) {
    super(policy);
    this.addControl('endpointUrl', new FormControl(policy?.endpointUrl));
    this.addControl('responseCodes', new FormControl(policy?.acceptableResponseCodes));
  }

  /**
   * Maps the form values to the passed RemoteEndpointServiceAccessStrategy DTO.
   *
   * @param policy - policy to populate
   */
  map(policy: RemoteEndpointServiceAccessStrategy) {
    super.map(policy);
    policy.endpointUrl = this.endpointUrl.value;
    policy.acceptableResponseCodes = this.responseCodes.value;
  }
}
