import {FormControl, FormGroup} from '@angular/forms';
import {RegisteredServicePublicKey, RegisteredServicePublicKeyImpl} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating Public Key.
 *
 * @author Travis Schmidt
 */
export class PublicKeyForm extends FormGroup {

  get location() { return this.get('location') as FormControl; }
  get algorithm() { return this.get('algorithm') as FormControl; }

  constructor(pk: RegisteredServicePublicKey) {
    super({
      location: new FormControl(pk?.location),
      algorithm: new FormControl(pk?.algorithm)
    });
  }

  /**
   * Maps the form values to RegisteredServicePublicKey.
   */
  map(): RegisteredServicePublicKey {
    if (this.location.value) {
      const pk = new RegisteredServicePublicKeyImpl();
      pk.location = this.location.value;
      pk.algorithm = this.algorithm.value;
      return pk;
    }
    return null;
  }
}
