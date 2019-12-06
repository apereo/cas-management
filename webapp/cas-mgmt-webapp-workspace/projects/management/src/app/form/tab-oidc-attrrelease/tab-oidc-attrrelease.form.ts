import {FormGroup} from '@angular/forms';
import {OidcRegisteredService} from 'domain-lib';
import {MgmtFormControl, MgmtFormGroup} from 'mgmt-lib';

export class TabOidcAttrForm extends FormGroup implements MgmtFormGroup<OidcRegisteredService> {

  get scopes() { return this.get('scopes') as MgmtFormControl; }

  constructor(service: OidcRegisteredService) {
    super({
      scopes: new MgmtFormControl(service && service.scopes)
    });
  }

  mapForm(service: OidcRegisteredService) {
    service.scopes = this.scopes.value;
  }

  formMap(): any {
  }
}
