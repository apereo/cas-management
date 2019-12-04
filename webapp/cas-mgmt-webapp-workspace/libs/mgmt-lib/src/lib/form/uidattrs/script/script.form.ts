import {UidattrsForm} from '../uidattrs.form';
import {ScriptedRegisteredServiceUsernameProvider} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class ScriptUidForm extends UidattrsForm {

  get script() { return this.get('script') as MgmtFormControl; }

  constructor(provider: ScriptedRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('script', new MgmtFormControl(provider && provider.script));
  }

  mapForm(provider: ScriptedRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    provider.script = this.script.value;
  }
}
