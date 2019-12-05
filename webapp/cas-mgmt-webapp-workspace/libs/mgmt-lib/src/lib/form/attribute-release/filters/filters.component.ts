import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {
  FilterType,
  RegisteredServiceMappedRegexAttributeFilter,
  RegisteredServiceMutantRegexAttributeFilter,
  RegisteredServiceRegexAttributeFilter, RegisteredServiceReverseMappedRegexAttributeFilter,
  RegisteredServiceScriptedAttributeFilter
} from 'domain-lib';
import {ChainingFilterForm, FilterForm, FilterMappedRegExForm} from './filters.form';

@Component({
  selector: 'lib-attribute-release-filters',
  templateUrl: './filters.component.html'
})

export class FiltersComponent implements OnInit {

  selectedFilter: number;

  @ViewChild('accordian', { static: true })
  accordian: ElementRef;

  @Input()
  form: ChainingFilterForm;

  TYPE = FilterType;

  constructor() {
  }

  ngOnInit() {
  }

  removeFilter() {
    this.form.removeAt(this.selectedFilter);
    this.form.markAsTouched();
  }

  isMappedRegEx(filter: FilterForm): boolean {
    return filter.type === FilterType.MAPPED_REGEX;
  }

  isReverseMapped(filter: FilterForm): boolean {
    return filter.type === FilterType.REVERSE_MAPPED_REGEX;
  }

  isMutantMappedRegEx(filter: FilterForm): boolean {
    return filter.type === FilterType.MUTANT_REGEX;
  }

  isScripted(filter: FilterForm): boolean {
    return filter.type === FilterType.SCRIPTED;
  }

  isRegEx(filter: FilterForm): boolean {
    return filter.type === FilterType.REGEX;
  }

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

  moveUp() {
    const index = this.selectedFilter;
    const up = this.form.controls[index];
    this.form.controls[index] = this.form.controls[index - 1];
    this.form.controls[index - 1] = up;
  }

  moveDown() {
    const index = this.selectedFilter;
    const down = this.form.controls[index];
    this.form.controls[index] = this.form.controls[index + 1];
    this.form.controls[index + 1] = down;
  }

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
