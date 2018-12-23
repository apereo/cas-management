import {BaseAttrForm} from './base-attr-form';
import {ScriptedRegisteredServiceUsernameProvider, MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class ScriptAttrForm extends BaseAttrForm<ScriptedRegisteredServiceUsernameProvider> {

  constructor(public provider: ScriptedRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('script', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['script'] = this.provider.script;
    return frm;
  }

  mapForm(provider: ScriptedRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    provider.script = this.value.script;
  }

}
