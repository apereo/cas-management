import {BaseReleaseForm} from './base-release-form';
import {GroovyScriptAttributeReleasePolicy, MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class GroovyReleaseForm extends BaseReleaseForm<GroovyScriptAttributeReleasePolicy> {

  constructor(public data: GroovyScriptAttributeReleasePolicy) {
    super(data);
    this.addControl('groovy', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['groovy'] = this.data.groovyScript;
    return frm;
  }

  mapForm(policy: GroovyScriptAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.groovyScript = this.value.groovy;
  }
}
