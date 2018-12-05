import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {
  AbstractRegisteredService,
  DataRecord,
  DefaultRegisteredServiceMultifactorPolicy,
  GroovyRegisteredServiceMultifactorPolicy,
  MfaPolicyType,
  MgmtFormControl,
  MgmtFormGroup,
  RegisteredServiceMultifactorPolicy
} from 'mgmt-lib';

export class MultiauthForm extends MgmtFormGroup {

  static policyType: MfaPolicyType = MfaPolicyType.DEFAULT;

  constructor(public data: DataRecord) {
    super();
    this.form = new FormGroup({
      type: new MgmtFormControl(null),
      defaultMfa: new FormGroup({
        multifactorAuthenticationProviders: new MgmtFormControl(null),
        failureMode: new MgmtFormControl(null),
        principalAttributeNameTrigger: new MgmtFormControl(null),
        principalAttributeValueToMatch: new MgmtFormControl(null),
        bypassEnabled: new MgmtFormControl(null)
      }),
      groovy: new MgmtFormControl(null, null, this.condtionalReq(MfaPolicyType.GROOVY))
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    const policy: RegisteredServiceMultifactorPolicy = this.data.service.multifactorPolicy;
    const type = this.type(policy);
    return {
      type: type,
      defaultMfa: {
        multifactorAuthenticationProviders: type === MfaPolicyType.DEFAULT ? (<DefaultRegisteredServiceMultifactorPolicy>policy).multifactorAuthenticationProviders : null,
        failureMode: type === MfaPolicyType.DEFAULT ? (<DefaultRegisteredServiceMultifactorPolicy>policy).failureMode : null,
        principalAttributeNameTrigger: type === MfaPolicyType.DEFAULT ? (<DefaultRegisteredServiceMultifactorPolicy>policy).principalAttributeNameTrigger : null,
        principalAttributeValueToMatch: type === MfaPolicyType.DEFAULT ? (<DefaultRegisteredServiceMultifactorPolicy>policy).principalAttributeValueToMatch : null,
        bypassEnabled: type === MfaPolicyType.DEFAULT ? (<DefaultRegisteredServiceMultifactorPolicy>policy).bypassEnabled : null
      },
      groovy: type === MfaPolicyType.GROOVY ? (<GroovyRegisteredServiceMultifactorPolicy>policy).groovyScript : null
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    if (frm.type === MfaPolicyType.DEFAULT) {
      const mfaPolicy: DefaultRegisteredServiceMultifactorPolicy = new DefaultRegisteredServiceMultifactorPolicy();
      mfaPolicy.multifactorAuthenticationProviders = frm.defaultMfa.multifactorAuthenticationProviders;
      mfaPolicy.failureMode = frm.defaultMfa.failureMode;
      mfaPolicy.principalAttributeNameTrigger = frm.defaultMfa.principalAttributeNameTrigger;
      mfaPolicy.principalAttributeValueToMatch = frm.defaultMfa.prinicipalAttributeValueToMatch;
      mfaPolicy.bypassEnabled = frm.defaultMfa.bypassEnabled;
      service.multifactorPolicy = mfaPolicy;
    } else {
      service.multifactorPolicy = new GroovyRegisteredServiceMultifactorPolicy();
      (<GroovyRegisteredServiceMultifactorPolicy>service.multifactorPolicy).groovyScript = frm.groovy;
    }
  }

  type(policy: RegisteredServiceMultifactorPolicy): MfaPolicyType {
    if (DefaultRegisteredServiceMultifactorPolicy.instanceOf(policy)) {
      return MfaPolicyType.DEFAULT;
    } else {
      return MfaPolicyType.GROOVY;
    }
  }

  condtionalReq(type: MfaPolicyType): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (MultiauthForm.policyType === type) {
        return control.value == null || control.value.length === 0 ? {'required': true } : null;
      }
      return null;
    };
  }
}
