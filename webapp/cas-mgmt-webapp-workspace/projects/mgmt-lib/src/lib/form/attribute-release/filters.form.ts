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
export class FilterForm extends FormGroup {

  constructor(form: any, public type: FilterType) {
    super(form);
  }
}

/**
 * Form group that extends FilterForm for Regex filters.
 */
export class RegexFilterForm extends FilterForm {

  get pattern() { return this.get('pattern') as FormControl; }

  constructor(filter: RegisteredServiceRegexAttributeFilter) {
    super({
      pattern: new FormControl(filter?.pattern)
    }, FilterType.REGEX);
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
    }, FilterType.SCRIPTED);
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
      caseInsensitive: new FormControl(filter?.caseInsensitive),
      completeMatch: new FormControl(filter?.completeMatch),
      excludeUnmappedAttributes: new FormControl(filter?.excludeUnmappedAttributes)
    }, type ? type : FilterType.MAPPED_REGEX);
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * param filter - RegisteredServiceMappedRegexAttributeFilter
   */
  map(filter: RegisteredServiceMappedRegexAttributeFilter) {
    filter.patterns = this.patterns.value;
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
}

/**
 * Form group that extends FilterForm for Reverse Mapped Regex filters.
 */
export class FilterMappedReverseForm extends FilterMappedRegExForm {

  constructor(filter: RegisteredServiceReverseMappedRegexAttributeFilter) {
    super(filter, FilterType.REVERSE_MAPPED_REGEX);
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

  /**
   * stub
   */
  map(): RegisteredServiceAttributeFilter {
    return null;
  }
}
