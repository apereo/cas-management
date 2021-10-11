import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {
  FilterType,
  RegisteredServiceAttributeFilter,
  RegisteredServiceChainingAttributeFilter,
  RegisteredServiceMappedRegexAttributeFilter, RegisteredServiceMutantRegexAttributeFilter,
  RegisteredServiceRegexAttributeFilter, RegisteredServiceReverseMappedRegexAttributeFilter,
  RegisteredServiceScriptedAttributeFilter
} from '@apereo/mgmt-lib/src/lib/model';
import {AttributesForm} from '../attributes.form';

/**
 * Base Filter form group.
 */
export abstract class FilterForm extends FormGroup {
  private readonly _filter: RegisteredServiceAttributeFilter;

  protected constructor(form: any, public type: FilterType, filter: RegisteredServiceAttributeFilter) {
    super(form);
    this._filter = filter;
  }

  get filter() : RegisteredServiceAttributeFilter {
    return this._filter;
  }

  abstract map() : RegisteredServiceAttributeFilter;
}

/**
 * Form group that extends FilterForm for Regex filters.
 */
export class RegexFilterForm extends FilterForm {

  get pattern() { return this.get('pattern') as FormControl; }

  constructor(filter: RegisteredServiceRegexAttributeFilter) {
    super({
      pattern: new FormControl(filter?.pattern)
    }, FilterType.REGEX, filter);
  }


  map(): RegisteredServiceAttributeFilter {
    let f = new RegisteredServiceRegexAttributeFilter();
    f.pattern = this.pattern.value;
    return f;
  }
}

/**
 * Form group that extends FilterForm for Regex filters.
 */
export class ScriptFilterForm extends FilterForm {

  get script() { return this.get('script') as FormControl; }

  constructor(filter: RegisteredServiceScriptedAttributeFilter) {
    super({
      script: new FormControl(filter?.script)
    }, FilterType.SCRIPTED, filter);
  }

  map(): RegisteredServiceAttributeFilter {
    let f = new RegisteredServiceScriptedAttributeFilter();
    f.script = this.script.value;
    return f;
  }
}

/**
 * Form group that extends FilterForm for Mapped Regex filters.
 */
export class FilterMappedRegExForm extends FilterForm {

  get patterns() { return this.get('patterns') as AttributesForm; }
  get caseInsensitive() { return this.get('caseInsensitive') as FormControl; }
  get completeMatch() { return this.get('completeMatch') as FormControl; }
  get excludeUnmappedAttributes() { return this.get('excludeUnmappedAttributes') as FormControl; }

  constructor(filter: RegisteredServiceMappedRegexAttributeFilter, type?: FilterType) {
    super({
      patterns: new AttributesForm(filter?.patterns),
      caseInsensitive: new FormControl(filter?.caseInsensitive ?? true),
      completeMatch: new FormControl(filter?.completeMatch),
      excludeUnmappedAttributes: new FormControl(filter?.excludeUnmappedAttributes)
    }, type ? type : FilterType.MAPPED_REGEX, filter);
  }

  map(): RegisteredServiceAttributeFilter {
    let filter = new RegisteredServiceMappedRegexAttributeFilter();
    this.mapDetails(filter);
    return filter;
  }

  protected mapDetails(filter: RegisteredServiceMappedRegexAttributeFilter) {
    filter.patterns = this.patterns.mapString();
    filter.excludeUnmappedAttributes = this.excludeUnmappedAttributes.value;
    filter.completeMatch = this.completeMatch.value;
    filter.caseInsensitive = this.caseInsensitive.value;
  }
}

/**
 * Form group that extends FilterForm for Mutant MappedRegex filters.
 */
export class FilterMappedMutantForm extends FilterMappedRegExForm {

  constructor(filter: RegisteredServiceMutantRegexAttributeFilter) {
    super(filter, FilterType.MUTANT_REGEX);
  }

  map(): RegisteredServiceAttributeFilter {
    let filter = new RegisteredServiceMutantRegexAttributeFilter();
    this.mapDetails(filter);
    return filter;
  }
}

/**
 * Form group that extends FilterForm for Reverse Mapped Regex filters.
 */
export class FilterMappedReverseForm extends FilterMappedRegExForm {

  constructor(filter: RegisteredServiceReverseMappedRegexAttributeFilter) {
    super(filter, FilterType.REVERSE_MAPPED_REGEX);
  }

  map(): RegisteredServiceAttributeFilter {
    let filter = new RegisteredServiceReverseMappedRegexAttributeFilter();
    this.mapDetails(filter);
    return filter;
  }
}

/**
 * Form group that extends FilterForm for Chaining filters.
 */
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

  /**
   * Adds the passed filter to the form.
   *
   * @param f - filter to add
   */
  add(f: RegisteredServiceAttributeFilter) {
    this.createForm(f);
  }

  /**
   * Creator method that creates a form form the pased filter.
   *
   * @param f - filter to create the form for
   */
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

  map(): RegisteredServiceAttributeFilter {
    if (this.length > 0) {
      let chain = new RegisteredServiceChainingAttributeFilter();
      chain.order = 0;
      for (let i = 0; i < this.length; i++) {
        let form = this.at(i) as FilterForm;
        let filter = form.map();
        filter.order = i;
        chain.filters.push(filter);
      }
      return chain;
    }
    return null;
  }
}
