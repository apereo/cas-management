import {RegisteredServiceMultifactorPolicy} from 'domain-lib';
import {MgmtFormGroup} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';

export class BaseMfaForm<T extends RegisteredServiceMultifactorPolicy> extends FormGroup implements MgmtFormGroup<T> {

  constructor(public policy: RegisteredServiceMultifactorPolicy) {
    super({});
  }

  formMap(): any {

  }

  mapForm(service: RegisteredServiceMultifactorPolicy) {

  }
}
