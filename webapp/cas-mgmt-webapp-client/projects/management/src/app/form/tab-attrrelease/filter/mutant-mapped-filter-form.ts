import {MappedFilterForm} from './mapped-filter-form';
import {RegisteredServiceMutantRegexAttributeFilter, FilterType} from 'mgmt-lib';
import {FormControl} from '@angular/forms';

export class MutantMappedFilterForm extends MappedFilterForm {

  type = FilterType.MUTANT_REGEX;

  constructor(public filter: RegisteredServiceMutantRegexAttributeFilter) {
    super(filter);
    this.setControl('type', new FormControl(this.type));
  }

}
