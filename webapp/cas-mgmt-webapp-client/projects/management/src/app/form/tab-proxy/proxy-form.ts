import {FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AbstractRegisteredService,
  ProxyType, RefuseRegisteredServiceProxyPolicy,
  RegexMatchingRegisteredServiceProxyPolicy
} from 'mgmt-lib';

export class ProxyForm extends MgmtFormGroup {

  constructor(public data: DataRecord) {
    super();
    this.form = new FormGroup({
      type: new MgmtFormControl(null),
      regex: new MgmtFormControl(null, null, Validators.required)
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    const type = this.type();
    return {
      type: this.type(),
      regex: type === ProxyType.REGEX ? (<RegexMatchingRegisteredServiceProxyPolicy>this.data.service.proxyPolicy).pattern : null
    }
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    if (frm.type === ProxyType.REGEX) {
      (<RegexMatchingRegisteredServiceProxyPolicy>service.proxyPolicy).pattern = frm.regex;
    } else {
      service.proxyPolicy = new RefuseRegisteredServiceProxyPolicy();
    }
  }

  type(): ProxyType {
    if (RegexMatchingRegisteredServiceProxyPolicy.instanceOf(this.data.service.proxyPolicy)) {
      return ProxyType.REGEX;
    } else {
      return ProxyType.REFUSE;
    }
  }
}
