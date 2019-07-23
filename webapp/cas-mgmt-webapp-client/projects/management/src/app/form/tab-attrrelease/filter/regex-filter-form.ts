import {BaseFilterForm} from './filter-form';
import {RegisteredServiceRegexAttributeFilter, FilterType} from 'domain-lib';
import {FormControl} from '@angular/forms';
import {MgmtFormControl} from 'mgmt-lib';

export class RegexFilterForm extends BaseFilterForm<RegisteredServiceRegexAttributeFilter> {

  type = FilterType.REGEX;

  constructor(public filter: RegisteredServiceRegexAttributeFilter) {
    super({});
    this.addControl('pattern', new MgmtFormControl(null));
    this.addControl('order', new MgmtFormControl(null));
    this.addControl('type', new FormControl(this.type));
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      pattern: this.filter.pattern,
      order: this.filter.order,
      type: this.type
    };
  }

  mapForm(filter: RegisteredServiceRegexAttributeFilter) {
    const frm = this.value;
    filter.pattern = frm.pattern;
    filter.order = frm.order;
  }
}
