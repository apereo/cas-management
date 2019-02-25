import {FormGroup} from '@angular/forms';
import {
  RegisteredServiceUsernameAttributeProvider,
  MgmtFormGroup,
  MgmtFormControl
} from 'mgmt-lib';

export class BaseAttrForm<T extends RegisteredServiceUsernameAttributeProvider> extends FormGroup implements MgmtFormGroup<T> {

  constructor(public provider: RegisteredServiceUsernameAttributeProvider) {
    super({
      encryptUsername: new MgmtFormControl(null),
      canonicalizationMode: new MgmtFormControl(null)
    });
  }

  formMap(): any {
    return {
      encryptUsername: this.provider.encryptUsername,
      canonicalizationMode: this.provider.canonicalizationMode
    };
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
