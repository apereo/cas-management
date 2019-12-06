import {FormGroup} from '@angular/forms';
import {RegisteredServicePublicKey, RegisteredServicePublicKeyImpl} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class PublicKeyForm extends FormGroup {

  get location() { return this.get('location') as MgmtFormControl; }
  get algorithm() { return this.get('algorithm') as MgmtFormControl; }

  constructor(pk: RegisteredServicePublicKey) {
    super({
      location: new MgmtFormControl(pk && pk.location),
      algorithm: new MgmtFormControl(pk && pk.algorithm)
    });
  }

  mapForm(): RegisteredServicePublicKey {
    if (this.location.value) {
      const pk = new RegisteredServicePublicKeyImpl();
      pk.location = this.location.value;
      pk.algorithm = this.algorithm.value;
      return pk;
    }
    return null;
  }
}
