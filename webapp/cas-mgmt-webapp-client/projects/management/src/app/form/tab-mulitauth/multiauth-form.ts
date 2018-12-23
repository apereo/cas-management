import {FormGroup} from '@angular/forms';
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

  type: MgmtFormControl;
  policy: BaseMfaForm<RegisteredServiceMultifactorPolicy>;

  constructor(public multifactorPolicy: RegisteredServiceMultifactorPolicy) {
    super({});
    const type = this.findType(multifactorPolicy);
    this.type = new MgmtFormControl(type);
    this.policy = this.getPolicy(type);
    this.addControl('type', this.type);
    this.addControl('policy', this.policy);
    this.type.valueChanges.subscribe(t => this.changeType(t));
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
    }
    if (GroovyRegisteredServiceMultifactorPolicy.instanceOf(policy)) {
      return MfaPolicyType.GROOVY;
    }
  }

  changeType(type: MfaPolicyType) {
    if (type === MfaPolicyType.DEFAULT) {
      this.policy = new DefaultMFAForm(new DefaultRegisteredServiceMultifactorPolicy());
    } else if (type === MfaPolicyType.GROOVY) {
      this.policy = new GroovyMfaForm(new GroovyRegisteredServiceMultifactorPolicy());
    } else {
      this.policy = new BaseMfaForm<RegisteredServiceMultifactorPolicy>(null);
    }
    this.setControl('policy', this.policy);
  }

  getPolicy(type: MfaPolicyType): BaseMfaForm<RegisteredServiceMultifactorPolicy> {
    if (type === MfaPolicyType.GROOVY) {
      return new GroovyMfaForm(this.multifactorPolicy as GroovyRegisteredServiceMultifactorPolicy);
    }
    if (type === MfaPolicyType.DEFAULT) {
      return new DefaultMFAForm(this.multifactorPolicy as DefaultRegisteredServiceMultifactorPolicy);
    }
    return new BaseMfaForm<RegisteredServiceMultifactorPolicy>(null);
  }
}
