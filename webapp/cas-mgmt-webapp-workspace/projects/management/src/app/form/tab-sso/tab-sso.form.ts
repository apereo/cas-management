import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, SsoForm} from 'mgmt-lib';
import {AbstractRegisteredService} from 'domain-lib';

export class TabSsoForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get sso() { return this.get('sso') as SsoForm; }

  constructor(public service: AbstractRegisteredService) {
    super({
      sso: new SsoForm(service)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    this.sso.mapForm(service);
  }
}
