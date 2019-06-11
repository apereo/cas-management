import {FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  MgmtFormControl,
  MgmtFormGroup,
  ProxyType,
  RefuseRegisteredServiceProxyPolicy,
  RegexMatchingRegisteredServiceProxyPolicy,
  RegisteredServiceProxyPolicy
} from 'mgmt-lib';
import {RegexProxyForm} from './regex-proxy-form';

export class ProxyForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: MgmtFormControl;
  policy: FormGroup;

  constructor(public proxyPolicy: RegisteredServiceProxyPolicy) {
    super({});
    const type = this.findType(proxyPolicy);
    this.policy = this.getPolicy(type);
    this.type = new MgmtFormControl(type);
    this.addControl('type', this.type);
    this.addControl('policy', this.policy);
    this.type.valueChanges.subscribe(val => this.changeType(val));
  }

  formMap(): any {
    return {};
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.value;
    if (frm.type === ProxyType.REGEX) {
      service.proxyPolicy = new RegexMatchingRegisteredServiceProxyPolicy();
      (<MgmtFormGroup<RegisteredServiceProxyPolicy>>this.policy).mapForm(service.proxyPolicy);
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

  changeType(type: ProxyType) {
    if (type === ProxyType.REGEX) {
      this.policy = new RegexProxyForm(new RegexMatchingRegisteredServiceProxyPolicy());
    } else {
      this.policy = new FormGroup({});
    }
    this.setControl('policy', this.policy);
  }

  getPolicy(type: ProxyType) {
    if (type === ProxyType.REGEX) {
      return new RegexProxyForm(this.proxyPolicy as RegexMatchingRegisteredServiceProxyPolicy);
    }
    return new FormGroup({});
  }
}
