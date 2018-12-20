import {FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  WSFederationRegisterdService,
  AbstractRegisteredService
} from 'mgmt-lib';

export class WsfedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public data: DataRecord) {
    super({
      realm: new MgmtFormControl(null, null, Validators.required),
      appliesTo: new MgmtFormControl(null, null, Validators.required)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    const ws: WSFederationRegisterdService = this.data.service as WSFederationRegisterdService;
    return {
      realm: ws.realm,
      appliesTo: ws.appliesTo
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const srv: WSFederationRegisterdService = service as WSFederationRegisterdService;
    const frm = this.value;
    srv.appliesTo = frm.appliesTo;
    srv.realm = frm.realm;
  }
}
