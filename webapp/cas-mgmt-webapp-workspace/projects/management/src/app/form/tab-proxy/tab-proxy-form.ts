import {FormGroup} from '@angular/forms';
import {MgmtFormControl, MgmtFormGroup, ProxyForm, RefuseProxyForm, RegExProxyForm} from 'mgmt-lib';
import {
  AbstractRegisteredService,
  ProxyType,
  RefuseRegisteredServiceProxyPolicy,
  RegexMatchingRegisteredServiceProxyPolicy,
  RegisteredServiceProxyPolicy
} from 'domain-lib';

export class TabProxyForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: MgmtFormControl;
  get policy() { return this.get('policy') as ProxyForm; }
  set policy(p: ProxyForm) { this.setControl('policy', p); }

  constructor(public proxyPolicy: RegisteredServiceProxyPolicy) {
    super({});
    this.type = new MgmtFormControl(this.findType(proxyPolicy));
    this.policy = this.getPolicy();
    this.type.valueChanges.subscribe(val => this.changeType());
  }

  mapForm(service: AbstractRegisteredService) {
    if (this.type.value === ProxyType.REGEX) {
      service.proxyPolicy = this.policy.mapForm();
    } else {
      service.proxyPolicy = new RefuseRegisteredServiceProxyPolicy();
    }
  }

  findType(policy: RegisteredServiceProxyPolicy): ProxyType {
    if (RegexMatchingRegisteredServiceProxyPolicy.instanceOf(policy)) {
      return ProxyType.REGEX;
    } else {
      return ProxyType.REFUSE;
    }
  }

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

  getPolicy(): ProxyForm {
    if (this.type.value === ProxyType.REGEX) {
      return new RegExProxyForm(this.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy);
    }
    return new RefuseProxyForm();
  }
}
