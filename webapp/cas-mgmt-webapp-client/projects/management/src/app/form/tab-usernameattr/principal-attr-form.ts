import {BaseAttrForm} from './base-attr-form';
import {PrincipalAttributeRegisteredServiceUsernameProvider, MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class PrincipalAttrForm extends BaseAttrForm<PrincipalAttributeRegisteredServiceUsernameProvider> {

  constructor(public provider: PrincipalAttributeRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('usernameAttribute', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['usernameAttribute'] = this.provider.usernameAttribute;
    return frm;
  }

  mapForm(provider: PrincipalAttributeRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    provider.usernameAttribute = this.value.usernameAttribute;
  }

}
