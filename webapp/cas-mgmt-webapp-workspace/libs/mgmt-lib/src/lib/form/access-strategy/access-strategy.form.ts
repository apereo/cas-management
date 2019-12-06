import {FormGroup} from '@angular/forms';
import {RegisteredServiceAccessStrategy} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {AttributesForm} from '../attributes/attributes.form';

export class AccessStrategyForm extends FormGroup {

  get requireAll() { return this.get('requireAll') as MgmtFormControl; }
  get unauthorizedUrl() { return this.get('unauthorizedUrl') as MgmtFormControl; }
  get requiredAttributes() { return this.get('requiredAttributes') as AttributesForm; }
  get caseInsensitive() { return this.get('caseInsensitive') as MgmtFormControl; }
  get rejectedAttributes() { return this.get('rejectedAttributes') as AttributesForm; }

  constructor(strategy: RegisteredServiceAccessStrategy) {
    super({
      requireAll: new MgmtFormControl(strategy && strategy.requireAllAttributes),
      unauthorizedUrl: new MgmtFormControl(strategy && strategy.unauthorizedRedirectUrl),
      requiredAttributes: new AttributesForm(strategy && strategy.requiredAttributes),
      caseInsensitive: new MgmtFormControl(strategy && strategy.caseInsensitive),
      rejectedAttributes: new AttributesForm(strategy && strategy.rejectedAttributes)
    });
  }

  mapForm(strategy: RegisteredServiceAccessStrategy) {
    strategy.unauthorizedRedirectUrl = this.unauthorizedUrl.value;
    strategy.requireAllAttributes = this.requireAll.value;
    strategy.requiredAttributes = this.requiredAttributes.mapForm();
    strategy.caseInsensitive = this.caseInsensitive.value;
    strategy.rejectedAttributes = this.rejectedAttributes.mapForm();
  }
}
