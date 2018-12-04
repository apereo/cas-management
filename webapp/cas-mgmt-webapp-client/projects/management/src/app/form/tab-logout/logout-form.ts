import {FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AbstractRegisteredService
} from 'mgmt-lib';

export class LogoutForm extends MgmtFormGroup {

  constructor(public data: DataRecord) {
    super();
    this.form = new FormGroup({
      logout: new MgmtFormControl(null),
      logoutType: new MgmtFormControl(null)
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    return {
      logout: this.data.service.logoutUrl,
      logoutType: this.data.service.logoutType
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    service.logoutUrl = frm.logout;
    service.logoutType = frm.logoutType;
  }
}
