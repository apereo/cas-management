import {FormGroup} from '@angular/forms';
import {DefaultRegisteredServiceUsernameProvider} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class UidattrsForm extends FormGroup {

  get encryptUsername() { return this.get('encryptUsername') as MgmtFormControl; }
  get canonicalizationMode() { return this.get('canonicalizationMode') as MgmtFormControl; }

  constructor(provider: DefaultRegisteredServiceUsernameProvider) {
    super({
      encryptUsername: new MgmtFormControl(provider?.encryptUsername),
      canonicalizationMode: new MgmtFormControl(provider?.canonicalizationMode)
    });
  }

  mapForm(provider: DefaultRegisteredServiceUsernameProvider) {
    provider.encryptUsername = this.encryptUsername.value;
    provider.canonicalizationMode = this.canonicalizationMode.value;
  }
}
