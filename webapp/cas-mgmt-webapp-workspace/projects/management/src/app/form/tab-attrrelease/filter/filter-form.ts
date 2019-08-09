import {FormGroup} from '@angular/forms';
import {MgmtFormGroup} from 'mgmt-lib';
import {RegisteredServiceAttributeFilter, FilterType} from 'domain-lib';

export class BaseFilterForm<T extends RegisteredServiceAttributeFilter> extends FormGroup implements MgmtFormGroup<T> {

  type: FilterType;

  constructor(public filter: RegisteredServiceAttributeFilter) {
    super({});
  }

  formMap(): any {

  }

  mapForm(filter: RegisteredServiceAttributeFilter) {

  }
}
