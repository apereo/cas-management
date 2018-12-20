import {FormGroup} from '@angular/forms';
import {
  RegisteredServiceUsernameAttributeProvider,
  MgmtFormGroup,
  MgmtFormControl
} from 'mgmt-lib';

export class BaseAttrForm<T extends RegisteredServiceUsernameAttributeProvider> extends FormGroup implements MgmtFormGroup<T> {

  constructor(public data: RegisteredServiceUsernameAttributeProvider) {
    super({
      encryptUsername: new MgmtFormControl(null),
      canonicalizationMode: new MgmtFormControl(null)
    });
  }

  formMap(): any {
    return {
      encryptUsername: this.data.encryptUsername,
      canonicalizationMode: this.data.canonicalizationMode
    }
  }

  mapForm(provider: RegisteredServiceUsernameAttributeProvider) {
    this.baseForm(provider);
  }

  baseForm(provider: RegisteredServiceUsernameAttributeProvider) {
    const frm = this.value;
    provider.encryptUsername = frm.encryptUsername;
    provider.canonicalizationMode = frm.canonicalizationMode;
  }
}
