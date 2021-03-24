import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  DefaultRegisteredServiceMultifactorPolicy,
  GroovyRegisteredServiceMultifactorPolicy, mfaPolicyFactory,
  MfaPolicyType,
  RegisteredServiceMultifactorPolicy
} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, MfaForm, GroovyMfaForm, DefaultMfaForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating MFA policies for a service.
 *
 * @author Travis Schmidt
 */
export class TabMultiauthForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: FormControl;
  get policy() { return this.get('policy') as MfaForm; }
  set policy(m: MfaForm) { this.setControl('policy', m); }

  constructor(public multifactorPolicy: RegisteredServiceMultifactorPolicy) {
    super({});
    this.reset();
  }

  /**
   * .
   */
  reset(): void {
    this.type = new FormControl(this.findType(this.multifactorPolicy));
    this.policy = this.getPolicy();
    this.type.valueChanges.subscribe(() => this.changeType());
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    if (this.type.value === MfaPolicyType.DEFAULT) {
      service.multifactorPolicy = new DefaultRegisteredServiceMultifactorPolicy();
    }
    if (this.type.value === MfaPolicyType.GROOVY) {
      service.multifactorPolicy = new GroovyRegisteredServiceMultifactorPolicy();
    }
    this.policy.map(service.multifactorPolicy);
  }

  /**
   * Determines the mfa type corresponding to the passed policy.
   *
   * @param policy - RegisteredServiceMultifactorPolicy
   */
  findType(policy: RegisteredServiceMultifactorPolicy): MfaPolicyType {
    if (DefaultRegisteredServiceMultifactorPolicy.instanceOf(policy)) {
      return MfaPolicyType.DEFAULT;
    }
    if (GroovyRegisteredServiceMultifactorPolicy.instanceOf(policy)) {
      return MfaPolicyType.GROOVY;
    }
  }

  /**
   * Handles changing the type of MFA policy used.
   */
  changeType() {
    const type = this.type.value;
    this.multifactorPolicy = mfaPolicyFactory(null, type);
    this.policy = this.getPolicy();
    this.policy.markAsTouched();
    this.policy.markAsDirty();
  }

  /**
   * Creates and returns a MfaForm based on the current policy.
   */
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
