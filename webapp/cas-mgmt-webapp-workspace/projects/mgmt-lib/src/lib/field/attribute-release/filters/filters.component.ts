import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {
  FilterType,
  RegisteredServiceMappedRegexAttributeFilter,
  RegisteredServiceMutantRegexAttributeFilter,
  RegisteredServiceRegexAttributeFilter, RegisteredServiceReverseMappedRegexAttributeFilter,
  RegisteredServiceScriptedAttributeFilter
} from '@apereo/mgmt-lib/src/lib/model';
import {ChainingFilterForm, FilterForm, FilterMappedRegExForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display and update Attribute Release Filters on a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-attribute-release-filters',
  templateUrl: './filters.component.html'
})

export class FiltersComponent {

  selectedFilter: number;

  @ViewChild('accordian', { static: true })
  accordian: ElementRef;

  @Input()
  form: ChainingFilterForm;

  TYPE = FilterType;

  constructor() {
  }

  /**
   * Removes the selected filter from the service.
   */
  removeFilter() {
    this.form.removeAt(this.selectedFilter);
    this.form.markAsDirty();
    this.form.markAsTouched();
  }

  /**
   * Returns true if the passed filter is an instance of a Mapped Regex.
   *
   * @param filter - filter to inspect
   */
  isMappedRegEx(filter: FilterForm): boolean {
    return filter.type === FilterType.MAPPED_REGEX;
  }

  /**
   * Returns true if the passed filter is an instance of a Reverse Mapped Regex.
   *
   * @param filter - filter to inspect
   */
  isReverseMapped(filter: FilterForm): boolean {
    return filter.type === FilterType.REVERSE_MAPPED_REGEX;
  }

  /**
   * Returns true if the passed filter is an instance of a Mutant Regex.
   *
   * @param filter - filter to inspect
   */
  isMutantMappedRegEx(filter: FilterForm): boolean {
    return filter.type === FilterType.MUTANT_REGEX;
  }

  /**
   * Returns true if the passed filter is an instance of Scripted.
   *
   * @param filter - filter to inspect
   */
  isScripted(filter: FilterForm): boolean {
    return filter.type === FilterType.SCRIPTED;
  }

  /**
   * Returns true if the passed filter is an instance of a Regex.
   *
   * @param filter - filter to inspect
   */
  isRegEx(filter: FilterForm): boolean {
    return filter.type === FilterType.REGEX;
  }

  /**
   * Returns the list of attributes this filter maps.
   *
   * @param filter - the filter to inspect
   */
  getAttributes(filter: FilterMappedRegExForm): string[] {
    if (filter.patterns.value) {
      const parry = filter.patterns;
      const keys: string[] = [];
      for (const pg of parry.controls) {
        keys.push(pg.get('key').value);
      }
      return keys;
    }
    return [''];
  }

  /**
   * Moves the filter up in the list.
   */
  moveUp() {
    const index = this.selectedFilter;
    const up = this.form.controls[index];
    this.form.controls[index] = this.form.controls[index - 1];
    this.form.controls[index - 1] = up;
    this.form.markAsDirty();
    this.form.markAsTouched();
  }

  /**
   * Moves the filter down in the list.
   */
  moveDown() {
    const index = this.selectedFilter;
    const down = this.form.controls[index];
    this.form.controls[index] = this.form.controls[index + 1];
    this.form.controls[index + 1] = down;
    this.form.markAsDirty();
    this.form.markAsTouched();
  }

  /**
   * Adds a filter of the passed type.
   *
   * @param type - type of filter to add
   */
  addFilter(type: FilterType) {
    if (type === FilterType.REGEX) {
      this.form.add(new RegisteredServiceRegexAttributeFilter());
    } else if (type === FilterType.SCRIPTED) {
      this.form.add(new RegisteredServiceScriptedAttributeFilter());
    } else if (type === FilterType.MAPPED_REGEX) {
      this.form.add(new RegisteredServiceMappedRegexAttributeFilter());
    } else if (type === FilterType.MUTANT_REGEX) {
      this.form.add(new RegisteredServiceMutantRegexAttributeFilter());
    } else if (type === FilterType.REVERSE_MAPPED_REGEX) {
      this.form.add(new RegisteredServiceReverseMappedRegexAttributeFilter());
    }
  }

}
