import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, DelegatedForm} from 'mgmt-lib';
import {AbstractRegisteredService} from 'domain-lib';

export class TabDelegatedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get auth() { return this.get('auth') as DelegatedForm; }

  constructor(public service: AbstractRegisteredService) {
    super({
      auth: new DelegatedForm(service && service.accessStrategy && service.accessStrategy.delegatedAuthenticationPolicy)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    this.auth.mapForm(service.accessStrategy.delegatedAuthenticationPolicy);
  }
}
