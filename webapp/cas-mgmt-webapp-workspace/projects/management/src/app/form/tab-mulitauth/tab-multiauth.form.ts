import {FormControl, FormGroup} from '@angular/forms';
import {MgmtFormControl, MgmtFormGroup, MfaForm, DefaultMfaForm, GroovyMfaForm} from 'mgmt-lib';
import {
  AbstractRegisteredService,
  DefaultRegisteredServiceMultifactorPolicy,
  GroovyRegisteredServiceMultifactorPolicy, mfaPolicyFactory,
  MfaPolicyType,
  RegisteredServiceMultifactorPolicy
} from 'domain-lib';

export class TabMultiauthForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: MgmtFormControl;
  get policy() { return this.get('policy') as MfaForm; }
  set policy(m: MfaForm) { this.setControl('policy', m); }

  constructor(public multifactorPolicy: RegisteredServiceMultifactorPolicy) {
    super({
      form: new FormControl(null)
    });
    this.type = new MgmtFormControl(this.findType(multifactorPolicy));
    this.policy = this.getPolicy();
    this.type.valueChanges.subscribe(t => this.changeType());
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

  changeType() {
    const type = this.type.value;
    this.multifactorPolicy = mfaPolicyFactory(null, type);
    this.policy = this.getPolicy();
    this.policy.markAsTouched();
    this.policy.markAsDirty();
  }

  getPolicy(): MfaForm {
    const type = this.type.value;
    if (type === MfaPolicyType.GROOVY) {
      return new GroovyMfaForm(this.multifactorPolicy as GroovyRegisteredServiceMultifactorPolicy);
    }
    if (type === MfaPolicyType.DEFAULT) {
      return new DefaultMfaForm(this.multifactorPolicy as DefaultRegisteredServiceMultifactorPolicy);
    }
  }
}
