import {BaseAttrForm} from './base-attr-form';
import {ScriptedRegisteredServiceUsernameProvider, MgmtFormControl} from 'mgmt-lib';

export class ScriptAttrForm extends BaseAttrForm<ScriptedRegisteredServiceUsernameProvider> {

  constructor(public data: ScriptedRegisteredServiceUsernameProvider) {
    super(data);
    this.addControl('script', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['script'] = this.data.script;
    return frm;
  }

  mapForm(provider: ScriptedRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    provider.script = this.value.script;
  }

}
