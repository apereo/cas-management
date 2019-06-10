import {BaseAttrForm} from './base-attr-form';
import {GroovyRegisteredServiceUsernameProvider, MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class GroovyAttrForm extends BaseAttrForm<GroovyRegisteredServiceUsernameProvider> {

  constructor(public provider: GroovyRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('groovyScript', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['groovyScript'] = this.provider.groovyScript;
    return frm;
  }

  mapForm(provider: GroovyRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    provider.groovyScript = this.value.groovyScript;
  }
}
