import {
  MgmtFormGroup,
  MgmtFormControl,
  AbstractRegisteredService
} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';

export class LogoutForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: AbstractRegisteredService) {
    super({
      logout: new MgmtFormControl(null),
      logoutType: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      logout: this.service.logoutUrl,
      logoutType: this.service.logoutType
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.value;
    service.logoutUrl = frm.logout;
    service.logoutType = frm.logoutType;
  }
}
