import {FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AbstractRegisteredService
} from 'mgmt-lib';

export class ExpirationForm extends MgmtFormGroup {

  constructor(public data: DataRecord) {
    super();
    this.form = new FormGroup({
      expirationDate: new MgmtFormControl(null),
      deleteWhenExpired: new MgmtFormControl(null),
      notifyWhenDeleted: new MgmtFormControl(null)
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    return {
      expirationDate: this.data.service.expirationPolicy.expirationDate,
      deleteWhenExpired: this.data.service.expirationPolicy.deleteWhenExpired,
      notifyWhenDeleted: this.data.service.expirationPolicy.notifyWhenDeleted
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    service.expirationPolicy.expirationDate = frm.expirationDate;
    service.expirationPolicy.deleteWhenExpired = frm.deleteWhenExpired;
    service.expirationPolicy.notifyWhenDeleted = frm.notifyWhenDeleted;
  }
}
