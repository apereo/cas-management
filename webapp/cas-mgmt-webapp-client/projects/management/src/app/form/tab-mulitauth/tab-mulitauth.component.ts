import {Component} from '@angular/core';
import {MultiauthForm} from './multiauth-form';
import {
  DataRecord,
  DefaultRegisteredServiceMultifactorPolicy,
  GroovyRegisteredServiceMultifactorPolicy,
  MfaPolicyType
} from 'mgmt-lib';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tab-mulitauth',
  templateUrl: './tab-mulitauth.component.html'
})
export class TabMulitauthComponent {

  mfa: MultiauthForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('mfa')) {
      this.mfa = this.data.formMap.get('mfa') as MultiauthForm;
      return;
    }
    this.mfa = new MultiauthForm(this.data);
    this.mfa.get('type').valueChanges.subscribe(val => {
      this.mfa.get('defaultMfa').markAsPristine();
      this.mfa.get('groovy').markAsPristine();
      if (val === MfaPolicyType.DEFAULT) {
        this.setMfaControl(new DefaultRegisteredServiceMultifactorPolicy(), this.mfa.get('defaultMfa') as FormGroup);
      } else {
        this.mfa.get('groovy').setValue(null);
      }
    });
    this.data.formMap.set('mfa', this.mfa);
  }

  setMfaControl(policy: DefaultRegisteredServiceMultifactorPolicy, mfaControl: FormGroup) {
    mfaControl.get('multifactorAuthenticationProviders').setValue(policy.multifactorAuthenticationProviders);
    mfaControl.get('failureMode').setValue(policy.failureMode);
    mfaControl.get('principalAttributeNameTrigger').setValue(policy.principalAttributeNameTrigger);
    mfaControl.get('principalAttributeValueToMatch').setValue(policy.principalAttributeValueToMatch);
    mfaControl.get('bypassEnabled').setValue(policy.bypassEnabled);
  }

  groovyControl(policy: GroovyRegisteredServiceMultifactorPolicy, control: FormControl) {
    control.setValue(policy.groovyScript);
  }
}
