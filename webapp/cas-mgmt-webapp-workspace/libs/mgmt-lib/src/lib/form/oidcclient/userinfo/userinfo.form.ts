import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {OidcRegisteredService} from 'domain-lib';

export class UserinfoForm extends FormGroup {

  get userInfoSigningAlg() { return this.get('userInfoSigningAlg') as MgmtFormControl; }
  get userInfoEncryptedResponseAlg() { return this.get('userInfoEncryptedResponseAlg') as MgmtFormControl; }
  get userInfoEncryptedResponseEncoding() { return this.get('userInfoEncryptedResponseEncoding') as MgmtFormControl; }

  constructor(service: OidcRegisteredService) {
    super({
      userInfoSigningAlg: new MgmtFormControl(service && service.userInfoSigningAlg),
      userInfoEncryptedResponseAlg: new MgmtFormControl(service && service.userInfoEncryptedResponseAlg),
      userInfoEncryptedResponseEncoding: new MgmtFormControl(service && service.userInfoEncryptedResponseEncoding)
    });
  }

  mapForm(service: OidcRegisteredService) {
   service.userInfoSigningAlg = this.userInfoSigningAlg.value;
   service.userInfoEncryptedResponseAlg = this.userInfoEncryptedResponseAlg.value;
   service.userInfoEncryptedResponseEncoding = this.userInfoEncryptedResponseEncoding.value;
  }
}
