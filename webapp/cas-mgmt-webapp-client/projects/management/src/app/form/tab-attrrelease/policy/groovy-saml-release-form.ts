import {BaseReleaseForm} from './base-release-form';
import {GroovySamlRegisteredServiceAttributeReleasePolicy, MgmtFormControl} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class GroovySamlReleaseForm extends BaseReleaseForm<GroovySamlRegisteredServiceAttributeReleasePolicy> {

  constructor(public data: GroovySamlRegisteredServiceAttributeReleasePolicy) {
    super(data);
    this.addControl('allowed', new MgmtFormControl(null));
    this.addControl('groovySaml', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['allowed'] = this.data.allowedAttributes;
    frm['groovySaml'] = this.data.groovyScript;
    return frm;
  }

  mapForm(policy: GroovySamlRegisteredServiceAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.allowedAttributes = this.value.allowed;
    policy.groovyScript = this.value.groovySaml;
  }
}
