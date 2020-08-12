import {FormArray, FormGroup} from '@angular/forms';
import {
    FilterType,
    RegisteredServiceAttributeFilter,
    RegisteredServiceChainingAttributeFilter,
    RegisteredServiceMappedRegexAttributeFilter,
    RegisteredServiceMutantRegexAttributeFilter,
    RegisteredServiceRegexAttributeFilter,
    RegisteredServiceReverseMappedRegexAttributeFilter,
    RegisteredServiceScriptedAttributeFilter
} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {AttributesForm} from '../../attributes/attributes.form';

export class FilterForm extends FormGroup {

  constructor(form: any, public type: FilterType) {
    super(form);
  }
}

export class RegexFilterForm extends FilterForm {

  get pattern() { return this.get('pattern') as MgmtFormControl; }

  constructor(filter: RegisteredServiceRegexAttributeFilter) {
    super({
      pattern: new MgmtFormControl(filter?.pattern)
    }, FilterType.REGEX);
  }
}

export class ScriptFilterForm extends FilterForm {

  get script() { return this.get('script') as MgmtFormControl; }

  constructor(filter: RegisteredServiceScriptedAttributeFilter) {
    super({
      script: new MgmtFormControl(filter?.script)
    }, FilterType.SCRIPTED);
  }
}

export class FilterMappedRegExForm extends FilterForm {

  get patterns() { return this.get('patterns') as AttributesForm; }
  get caseInsensitive() { return this.get('caseInsensitive') as MgmtFormControl; }
  get completeMatch() { return this.get('completeMatch') as MgmtFormControl; }
  get excludeUnmappedAttributes() { return this.get('excludeUnmappedAttributes') as MgmtFormControl; }

  constructor(filter: RegisteredServiceMappedRegexAttributeFilter, type?: FilterType) {
    super({
      patterns: new AttributesForm(filter?.patterns),
      caseInsensitive: new MgmtFormControl(filter?.caseInsensitive),
      completeMatch: new MgmtFormControl(filter?.completeMatch),
      excludeUnmappedAttributes: new MgmtFormControl(filter?.excludeUnmappedAttributes)
    }, type ? type : FilterType.MAPPED_REGEX);
  }

  mapForm(filter: RegisteredServiceMappedRegexAttributeFilter) {
    filter.patterns = this.patterns.value;
    filter.excludeUnmappedAttributes = this.excludeUnmappedAttributes.value;
    filter.completeMatch = this.completeMatch.value;
    filter.caseInsensitive = this.caseInsensitive.value;
  }
}

export class FilterMappedMutantForm extends FilterMappedRegExForm {

  constructor(filter: RegisteredServiceMutantRegexAttributeFilter) {
    super(filter, FilterType.MUTANT_REGEX);
  }
}

export class FilterMappedReverseForm extends FilterMappedRegExForm {

  constructor(filter: RegisteredServiceReverseMappedRegexAttributeFilter) {
    super(filter, FilterType.REVERSE_MAPPED_REGEX);
  }
}

export class ChainingFilterForm extends FormArray {

  constructor(filter: RegisteredServiceAttributeFilter) {
    super([]);
    if (filter && RegisteredServiceChainingAttributeFilter.instanceof(filter)) {
      const filters = (filter as RegisteredServiceChainingAttributeFilter).filters;
      if (filters) {
        filters.forEach(f => this.createForm(f));
      }
    } else if (filter) {
      this.createForm(filter);
    }
  }

  add(f: RegisteredServiceAttributeFilter) {
    this.createForm(f);
  }

  private createForm(f: RegisteredServiceAttributeFilter) {
    if (RegisteredServiceRegexAttributeFilter.instanceOf(f)) {
      this.push(new RegexFilterForm(f as RegisteredServiceRegexAttributeFilter));
    } else if (RegisteredServiceScriptedAttributeFilter.instanceof(f)) {
      this.push(new ScriptFilterForm(f as RegisteredServiceScriptedAttributeFilter));
    } else if (RegisteredServiceMappedRegexAttributeFilter.instanceof(f)) {
      this.push(new FilterMappedRegExForm(f as RegisteredServiceMappedRegexAttributeFilter));
    } else if (RegisteredServiceReverseMappedRegexAttributeFilter.instanceof(f)) {
      this.push(new FilterMappedReverseForm(f as RegisteredServiceReverseMappedRegexAttributeFilter));
    } else if (RegisteredServiceMutantRegexAttributeFilter.instanceof(f)) {
      this.push(new FilterMappedMutantForm(f as RegisteredServiceMutantRegexAttributeFilter));
    }
  }

  mapForm(): RegisteredServiceAttributeFilter {
    return null;
  }
}
