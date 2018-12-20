import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, RegisteredServiceAttributeFilter, FilterType} from 'mgmt-lib';

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
