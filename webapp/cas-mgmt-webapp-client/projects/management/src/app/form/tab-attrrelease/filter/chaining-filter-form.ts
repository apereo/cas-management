import {BaseFilterForm} from './filter-form';
import {
  RegisteredServiceChainingAttributeFilter,
  RegisteredServiceMappedRegexAttributeFilter,
  RegisteredServiceMutantRegexAttributeFilter,
  RegisteredServiceRegexAttributeFilter,
  RegisteredServiceReverseMappedRegexAttributeFilter,
  RegisteredServiceScriptedAttributeFilter,
  FilterType,
  RegisteredServiceAttributeFilter
} from 'mgmt-lib';
import {FormArray, FormControl} from '@angular/forms';
import {MappedFilterForm} from './mapped-filter-form';
import {MutantMappedFilterForm} from './mutant-mapped-filter-form';
import {ReverseMappedFilterForm} from './reverse-mapped-filter-form';
import {RegexFilterForm} from './regex-filter-form';
import {ScriptFilterForm} from './script-filter-form';

export class ChainingFilterForm extends BaseFilterForm<RegisteredServiceChainingAttributeFilter> {

  type = FilterType.CHAINING;

  constructor(public filter: RegisteredServiceChainingAttributeFilter) {
    super(filter);
    const filters = new FormArray([]);
    this.addControl('filters', filters);
    this.addControl('type', new FormControl(this.type));
    if (filter && filter.filters) {
      for (const f of filter.filters) {
        if (RegisteredServiceMappedRegexAttributeFilter.instanceof(f)) {
          filters.push(new MappedFilterForm(f as RegisteredServiceMappedRegexAttributeFilter));
        }
        if (RegisteredServiceMutantRegexAttributeFilter.instanceof(f)) {
          filters.push(new MutantMappedFilterForm(f as RegisteredServiceMutantRegexAttributeFilter));
        }
        if (RegisteredServiceReverseMappedRegexAttributeFilter.instanceof(f)) {
          filters.push(new ReverseMappedFilterForm(f as RegisteredServiceReverseMappedRegexAttributeFilter));
        }
        if (RegisteredServiceRegexAttributeFilter.instanceOf(f)) {
          filters.push(new RegexFilterForm(f as RegisteredServiceRegexAttributeFilter));
        }
        if (RegisteredServiceScriptedAttributeFilter.instanceof(f)) {
          filters.push(new ScriptFilterForm(f as RegisteredServiceScriptedAttributeFilter));
        }
      }
    }
  }

  push(f: BaseFilterForm<RegisteredServiceAttributeFilter>) {
    (<FormArray>this.get('filters')).push(f);
  }

  size(): number {
    return (<FormArray>this.get('filters')).length;
  }

  atIndex(index: number): BaseFilterForm<RegisteredServiceAttributeFilter> {
    return (<FormArray>this.get('filters')).at(index) as BaseFilterForm<RegisteredServiceAttributeFilter>;
  }

  mapForm(filter: RegisteredServiceChainingAttributeFilter) {
    filter.filters = [];
    for (const c of (<FormArray>this.get('filters')).controls) {
      if (c.get('type').value === FilterType.MAPPED_REGEX) {
        const f = new RegisteredServiceMappedRegexAttributeFilter();
        (<MappedFilterForm>c).mapForm(f);
        filter.filters.push(f);
      }
      if (c.get('type').value === FilterType.MUTANT_REGEX) {
        const f = new RegisteredServiceMutantRegexAttributeFilter();
        (<MutantMappedFilterForm>c).mapForm(f);
        filter.filters.push(f);
      }
      if (c.get('type').value === FilterType.REVERSE_MAPPED_REGEX) {
        const f = new RegisteredServiceReverseMappedRegexAttributeFilter();
        (<ReverseMappedFilterForm>c).mapForm(f);
        filter.filters.push(f);
      }
      if (c.get('type').value === FilterType.REGEX) {
        const f = new RegisteredServiceRegexAttributeFilter();
        (<RegexFilterForm>c).mapForm(f);
        filter.filters.push(f);
      }
      if (c.get('type').value === FilterType.SCRIPTED) {
        const f = new RegisteredServiceScriptedAttributeFilter();
        (<ScriptFilterForm>c).mapForm(f);
        filter.filters.push(f);
      }
    }
  }
}
