import {PrincipalAttributeRegisteredServiceUsernameProvider} from '@apereo/mgmt-lib/src/lib/model';
import {UidattrsForm} from './uidattrs.form';
import {FormControl, Validators} from '@angular/forms';

/**
 * Form group for displaying and updating Principal uid attributes.
 *
 * @author Travis Schmidt
 */
export class PrincipalUidForm extends UidattrsForm {

  get attribute() { return this.get('usernameAttribute') as FormControl; }

  constructor(provider: PrincipalAttributeRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('usernameAttribute', new FormControl(provider?.usernameAttribute, Validators.required));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param provider - PrincipalAttributeRegisteredServiceUsernameProvider
   */
  map(provider: PrincipalAttributeRegisteredServiceUsernameProvider) {
    super.map(provider);
    provider.usernameAttribute = this.attribute.value;
  }
}
