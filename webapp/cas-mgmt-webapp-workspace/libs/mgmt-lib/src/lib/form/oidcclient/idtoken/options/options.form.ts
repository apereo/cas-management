import {FormGroup} from '@angular/forms';
import {OidcRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

export class OptionsForm extends FormGroup {

  get signIdToken() { return this.get('signIdToken') as MgmtFormControl; }
  get encryptIdToken() { return this.get('encryptIdToken') as MgmtFormControl; }

  constructor(private service: OidcRegisteredService) {
    super({
      signIdToken: new MgmtFormControl(service && service.signIdToken),
      encryptIdToken: new MgmtFormControl(service && service.encryptIdToken),
    });
  }

  mapForm(service: OidcRegisteredService) {
    service.signIdToken = this.signIdToken.value;
    service.encryptIdToken = this.encryptIdToken.value;
  }
}
