import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';
import {AbstractRegisteredService} from 'domain-lib';
import {FormGroup} from '@angular/forms';

export class TabLogoutForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get logout() { return this.get('logout') as MgmtFormControl; }
  get logoutType() { return this.get('logoutType') as MgmtFormControl; }

  constructor(service: AbstractRegisteredService) {
    super({
      logout: new MgmtFormControl(service?.logoutUrl),
      logoutType: new MgmtFormControl(service?.logoutType)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    service.logoutUrl = this.logout.value;
    service.logoutType = this.logoutType.value;
  }
}
