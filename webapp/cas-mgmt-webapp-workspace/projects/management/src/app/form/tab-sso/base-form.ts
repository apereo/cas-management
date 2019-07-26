import {FormGroup} from '@angular/forms';
import {MgmtFormGroup} from 'mgmt-lib';
import {
  RegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType,
  RegisteredServiceAttributeFilter
} from 'domain-lib';

export class BaseSsoPolicyForm<T extends RegisteredServiceSingleSignOnParticipationPolicy> extends FormGroup implements MgmtFormGroup<T> {

  type: SsoPolicyType;

  constructor(public filter: RegisteredServiceAttributeFilter) {
    super({});
  }

  formMap(): any {

  }

  mapForm(filter: RegisteredServiceAttributeFilter) {

  }
}
