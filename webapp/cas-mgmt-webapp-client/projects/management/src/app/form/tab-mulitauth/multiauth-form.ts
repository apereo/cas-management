import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {
  AbstractRegisteredService,
  DefaultRegisteredServiceMultifactorPolicy,
  GroovyRegisteredServiceMultifactorPolicy,
  MfaPolicyType,
  MgmtFormControl,
  MgmtFormGroup,
  RegisteredServiceMultifactorPolicy
} from 'mgmt-lib';
import {DefaultMFAForm} from './default-mfa-form';
import {GroovyMfaForm} from './groovy-mfa-form';
import {BaseMfaForm} from './base-mfa-form';

export class MultiauthForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  static policyType: MfaPolicyType = MfaPolicyType.DEFAULT;

  type: MgmtFormControl;
  policy: MgmtFormGroup<RegisteredServiceMultifactorPolicy>;

  constructor(public data: RegisteredServiceMultifactorPolicy) {
    super({});
    const type = this.findType(data);
    this.type = new MgmtFormControl(type);
    this.policy = this.getPolicy(type);
    this.addControl('type', this.type);
    this.addControl('policy', this.policy);
    this.type.valueChanges.subscribe(t => {
      this.changeType(t);
    });
  }

  formMap(): any {
    return {};
  }

  mapForm(service: AbstractRegisteredService) {
    if (this.type.value === MfaPolicyType.DEFAULT) {
      service.multifactorPolicy = new DefaultRegisteredServiceMultifactorPolicy();
    }
    if (this.type.value === MfaPolicyType.GROOVY) {
      service.multifactorPolicy = new GroovyRegisteredServiceMultifactorPolicy();
    }
    this.policy.mapForm(service.multifactorPolicy);
  }

  findType(policy: RegisteredServiceMultifactorPolicy): MfaPolicyType {
    if (DefaultRegisteredServiceMultifactorPolicy.instanceOf(policy)) {
      return MfaPolicyType.DEFAULT;
    } else {
      return MfaPolicyType.GROOVY;
    }
  }

  changeType(type: MfaPolicyType) {
    if (type === MfaPolicyType.DEFAULT) {
      this.policy = new DefaultMFAForm(new DefaultRegisteredServiceMultifactorPolicy());
    } else {
      this.policy = new GroovyMfaForm(new GroovyRegisteredServiceMultifactorPolicy());
    }
  }

  getPolicy(type: MfaPolicyType): BaseMfaForm<RegisteredServiceMultifactorPolicy> {
    if (type === MfaPolicyType.GROOVY) {
      return new GroovyMfaForm(this.data as GroovyRegisteredServiceMultifactorPolicy);
    } else {
      return new DefaultMFAForm(this.data as DefaultRegisteredServiceMultifactorPolicy);
    }
  }
}

function condtionalReq(type: MfaPolicyType): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (MultiauthForm.policyType === type) {
      return control.value == null || control.value.length === 0 ? {'required': true } : null;
    }
    return null;
  };
}
