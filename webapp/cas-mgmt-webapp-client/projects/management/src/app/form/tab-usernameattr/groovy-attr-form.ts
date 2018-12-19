import {BaseAttrForm} from './base-attr-form';
import {GroovyRegisteredServiceUsernameProvider, MgmtFormControl} from 'mgmt-lib';

export class GroovyAttrForm extends BaseAttrForm<GroovyRegisteredServiceUsernameProvider> {

  constructor(public data: GroovyRegisteredServiceUsernameProvider) {
    super(data);
    this.addControl('groovyScript', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any{
    const frm = super.formMap();
    frm['groovyScript'] = this.data.groovyScript;
    return frm;
  }

  mapForm(provider: GroovyRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    provider.groovyScript = this.value.groovyScript;
  }
}
