import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, RegisteredServiceAttributeFilter, FilterType} from 'mgmt-lib';
import {
  RegisteredServiceSingleSignOnParticipationPolicy,
  SsoPolicyType
} from '../../../../../mgmt-lib/src/lib/domain/sso-expiration';

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
