import {FormGroup} from '@angular/forms';
import {OidcRegisteredService} from 'domain-lib';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';

export class OidcAttrForm extends FormGroup implements MgmtFormGroup<OidcRegisteredService> {

  constructor(public service: OidcRegisteredService) {
    super({
      scopes: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      scopes: this.service.scopes
    };
  }

  mapForm(service: OidcRegisteredService) {
    service.scopes = this.value.scopes;
  }
}
