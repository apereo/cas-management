import {FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  MgmtFormControl,
  AbstractRegisteredService,
  RegisteredServicePublicKeyImpl
} from 'mgmt-lib';

export class AdvancedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: AbstractRegisteredService) {
    super({
      evalOrder: new MgmtFormControl(null),
      required: new MgmtFormControl(null),
      environments: new MgmtFormControl(null),
      responseType: new MgmtFormControl(null),
      publicKey: new FormGroup({
        location: new MgmtFormControl(null),
        algorithm: new MgmtFormControl(null)
       })
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return  {
      evalOrder: this.service.evaluationOrder,
      required: this.service.requiredHandlers,
      environments: this.service.environments,
      responseType: this.service.responseType,
      publicKey: {
        location: this.service.publicKey && this.service.publicKey.location,
        algorithm: this.service.publicKey && this.service.publicKey.algorithm
      }
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.value;
    service.evaluationOrder = frm.evalOrder;
    service.requiredHandlers = frm.required && frm.required.length > 0 ? frm.required.split(',') : null;
    service.environments = frm.environments && frm.environments.length > 0 ? frm.environments.split(',') : null;
    service.responseType = frm.responseType;
    if (frm.publicKey.location) {
      if (!service.publicKey) {
        service.publicKey = new RegisteredServicePublicKeyImpl();
      }
      service.publicKey.location = frm.publicKey.location;
      service.publicKey.algorithm = frm.publicKey.algorithm;
    }
  }
}
