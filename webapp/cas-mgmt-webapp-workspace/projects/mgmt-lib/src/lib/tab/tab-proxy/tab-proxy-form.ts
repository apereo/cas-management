import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  ProxyType,
  RefuseRegisteredServiceProxyPolicy,
  RegexMatchingRegisteredServiceProxyPolicy,
  RegisteredServiceProxyPolicy
} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, ProxyForm, RefuseProxyForm, RegExProxyForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating proxy policies for a service.
 *
 * @author Travis Schmidt
 */
export class TabProxyForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: FormControl;
  get policy() { return this.get('policy') as ProxyForm; }
  set policy(p: ProxyForm) { this.setControl('policy', p); }

  constructor(public proxyPolicy: RegisteredServiceProxyPolicy) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets the controls in the form.
   */
  reset(): void {
    this.type = new FormControl(this.findType(this.proxyPolicy));
    this.policy = this.getPolicy();
    this.type.valueChanges.subscribe(() => this.changeType());
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    if (this.type.value === ProxyType.REGEX) {
      service.proxyPolicy = this.policy.map();
    } else {
      service.proxyPolicy = new RefuseRegisteredServiceProxyPolicy();
    }
  }

  /**
   * Determines the proxy type corresponding to the passed policy.
   *
   * @param policy - RegisteredServiceProxyPolicy
   */
  findType(policy: RegisteredServiceProxyPolicy): ProxyType {
    if (RegexMatchingRegisteredServiceProxyPolicy.instanceOf(policy)) {
      return ProxyType.REGEX;
    } else {
      return ProxyType.REFUSE;
    }
  }

  /**
   * Handles changing the current policy type.
   */
  changeType() {
    if (this.type.value === ProxyType.REGEX) {
      this.proxyPolicy = new RegexMatchingRegisteredServiceProxyPolicy();
    } else {
      this.proxyPolicy = new RefuseRegisteredServiceProxyPolicy();
    }
    this.policy = this.getPolicy();
    this.policy.markAsTouched();
    this.policy.markAsDirty();
  }

  /**
   * Creates and returns Proxy form for the current policy.
   */
  getPolicy(): ProxyForm {
    if (this.type.value === ProxyType.REGEX) {
      return new RegExProxyForm(this.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy);
    }
    return new RefuseProxyForm();
  }
}
