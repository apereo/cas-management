import {BaseFilterForm} from './filter-form';
import {RegisteredServiceMappedRegexAttributeFilter, MgmtFormControl, FilterType} from 'mgmt-lib';
import {AttributeForm} from '../../attribute-form';
import {FormControl} from '@angular/forms';

export class MappedFilterForm extends BaseFilterForm<RegisteredServiceMappedRegexAttributeFilter> {

  type = FilterType.MAPPED_REGEX;

  constructor(public filter: RegisteredServiceMappedRegexAttributeFilter) {
    super(filter);
    this.addControl('patterns', new AttributeForm(filter.patterns));
    this.addControl('caseInsensitive', new MgmtFormControl(null));
    this.addControl('completeMatch', new MgmtFormControl(null));
    this.addControl('excludeUnmappedAttributes', new MgmtFormControl(null));
    this.addControl('order', new MgmtFormControl(null));
    this.addControl('type', new FormControl(this.type));
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      patterns: (<AttributeForm>this.get('patterns')).formMap(),
      caseInsensitive: this.filter.caseInsensitive,
      completeMatch: this.filter.completeMatch,
      excludeUnmappedAttributes: this.filter.excludeUnmappedAttributes,
      order: this.filter.order,
      type: this.get('type').value
    };
  }

  mapForm(filter: RegisteredServiceMappedRegexAttributeFilter) {
    const frm = this.value;
    filter.caseInsensitive = frm.caseInsensitive;
    filter.completeMatch = frm.completeMatch;
    filter.excludeUnmappedAttributes = frm.excludeUnmappedAttributes;
    filter.order = frm.order;
    filter.patterns = (<AttributeForm>this.get('patterns')).mapFormString();
  }

}
