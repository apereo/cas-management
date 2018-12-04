import {FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AbstractRegisteredService,
  RegisteredServicePublicKeyImpl} from 'mgmt-lib';

export class AdvancedForm extends MgmtFormGroup {

  constructor(public data: DataRecord) {
    super();
    this.form = new FormGroup({
      evalOrder: new MgmtFormControl(null),
      required: new MgmtFormControl(null),
      responseType: new MgmtFormControl(null),
      publicKey: new FormGroup({
        location: new MgmtFormControl(null),
        algorithm: new MgmtFormControl(null)
       })
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    return  {
      evalOrder: this.data.service.evaluationOrder,
      required: this.data.service.requiredHandlers,
      responseType: this.data.service.responseType,
      publicKey: {
        location: this.data.service.publicKey && this.data.service.publicKey.location,
        algorithm: this.data.service.publicKey && this.data.service.publicKey.algorithm
      }
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    service.evaluationOrder = frm.evalOrder;
    service.requiredHandlers = frm.required;
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
