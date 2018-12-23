import {FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  MgmtFormControl,
  WSFederationRegisterdService,
  AbstractRegisteredService
} from 'mgmt-lib';

export class WsfedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: WSFederationRegisterdService) {
    super({
      realm: new MgmtFormControl(null, null, Validators.required),
      appliesTo: new MgmtFormControl(null, null, Validators.required)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      realm: this.service.realm,
      appliesTo: this.service.appliesTo
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: WSFederationRegisterdService = service as WSFederationRegisterdService;
    const frm = this.value;
    srv.appliesTo = frm.appliesTo;
    srv.realm = frm.realm;
  }
}
