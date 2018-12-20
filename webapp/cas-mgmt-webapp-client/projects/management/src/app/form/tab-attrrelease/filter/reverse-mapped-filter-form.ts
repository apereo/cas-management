import {MappedFilterForm} from './mapped-filter-form';
import {RegisteredServiceReverseMappedRegexAttributeFilter, FilterType} from 'mgmt-lib';
import {FormControl} from '@angular/forms';

export class ReverseMappedFilterForm extends MappedFilterForm {

  type = FilterType.REVERSE_MAPPED_REGEX;

  constructor(public filter: RegisteredServiceReverseMappedRegexAttributeFilter) {
    super(filter);
    this.setControl('type', new FormControl(this.type));
  }
}
