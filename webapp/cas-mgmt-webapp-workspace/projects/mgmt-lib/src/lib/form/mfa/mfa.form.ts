import {FormGroup} from '@angular/forms';
import {RegisteredServiceMultifactorPolicy} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Abstract base form group for MFA policies.
 *
 * @author Travis Schmidt
 */
export abstract class MfaForm extends FormGroup {

  /**
   * Maps the form values to the passed DTO.
   *
   * @param policy - RegisteredServiceMultifactorPolicy
   */
  abstract map(policy: RegisteredServiceMultifactorPolicy);

}
