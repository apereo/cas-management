import {
  RegisteredServiceAccessStrategy,
  MgmtFormControl,
  DefaultRegisteredServiceDelegatedAuthenticationPolicy,
  MgmtFormGroup
} from 'mgmt-lib';
import {FormGroup} from '@angular/forms';
import {AttributeForm} from '../../attribute-form';

export class BaseAccessForm<T extends RegisteredServiceAccessStrategy> extends FormGroup implements MgmtFormGroup<T> {

  constructor(public strategy: RegisteredServiceAccessStrategy) {
    super({
      requireAll: new MgmtFormControl(null),
      unauthorizedUrl: new MgmtFormControl(null),
      requiredAttributes: new AttributeForm(strategy.requiredAttributes),
      caseInsensitive: new MgmtFormControl(null),
      rejectedAttributes: new AttributeForm(strategy.rejectedAttributes),
      allowedProviders: new MgmtFormControl(null)
    });
  }

  formMap(): any {
    const frm =  {
      requireAll: this.strategy.requireAllAttributes,
      unauthorizedUrl: this.strategy.unauthorizedRedirectUrl,
      requiredAttributes: (<AttributeForm>this.get('requiredAttributes')).formMap(),
      caseInsensitive: this.strategy.caseInsensitive,
      rejectedAttributes: (<AttributeForm>this.get('rejectedAttributes')).formMap(),
      allowedProviders: (this.strategy.delegatedAuthenticationPolicy
        && this.strategy.delegatedAuthenticationPolicy.allowedProviders) || null
    };
    return frm;
  }

  mapForm(strategy: RegisteredServiceAccessStrategy) {
    this.baseForm(strategy);
  }

  baseForm(strategy: RegisteredServiceAccessStrategy) {
    const frm = this.value;
    strategy.requireAllAttributes = frm.requireAll;
    strategy.unauthorizedRedirectUrl = frm.unauthorizedUrl;
    strategy.caseInsensitive = frm.caseInsensitive;
    strategy.requiredAttributes = (<AttributeForm>this.get('requiredAttributes')).mapForm();
    strategy.rejectedAttributes = (<AttributeForm>this.get('rejectedAttributes')).mapForm();
    if (frm.allowedProviders) {
      strategy.delegatedAuthenticationPolicy = new DefaultRegisteredServiceDelegatedAuthenticationPolicy();
      strategy.delegatedAuthenticationPolicy.allowedProviders = frm.allowedProviders;
    }
  }
}
