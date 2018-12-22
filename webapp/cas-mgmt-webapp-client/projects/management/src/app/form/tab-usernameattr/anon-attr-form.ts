import {BaseAttrForm} from './base-attr-form';
import {AnonymousRegisteredServiceUsernameProvider, MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class AnonAttrForm extends BaseAttrForm<AnonymousRegisteredServiceUsernameProvider> {

  constructor(public data: AnonymousRegisteredServiceUsernameProvider) {
    super(data);
    this.addControl('salt', new MgmtFormControl(null, null, Validators.required));
    this.addControl('attribute', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['salt'] = this.data.persistentIdGenerator.salt;
    frm['attribute'] = this.data.persistentIdGenerator.attribute;
    return frm;
  }

  mapForm(provider: AnonymousRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    const frm = this.value;
    provider.persistentIdGenerator.salt = frm.salt;
    provider.persistentIdGenerator.attribute = frm.attribute;
  }
}
