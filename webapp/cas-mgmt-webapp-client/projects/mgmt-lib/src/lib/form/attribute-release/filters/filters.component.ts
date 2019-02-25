import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FilterType} from '../../../domain/attribute-filter';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-attribute-release-filters',
  templateUrl: './filters.component.html'
})

export class FiltersComponent implements OnInit {

  selectedFilter: number;

  @ViewChild('accordian')
  accordian: ElementRef;

  @Input()
  control: FormGroup;

  filters: FormArray;

  @Output()
  addFilter: EventEmitter<FilterType> = new EventEmitter<FilterType>();

  TYPE = FilterType;

  constructor() {
  }

  ngOnInit() {
    this.filters = this.control.get('filters') as FormArray;
  }

  removeFilter() {
    this.filters.removeAt(this.selectedFilter);
    this.filters.markAsTouched();
  }

  isMappedRegEx(filter: FormGroup): boolean {
    return filter.get('type').value === FilterType.MAPPED_REGEX;
  }

  isReverseMapped(filter: FormGroup): boolean {
    return filter.get('type').value === FilterType.REVERSE_MAPPED_REGEX;
  }

  isMutantMappedRegEx(filter: FormGroup): boolean {
    return filter.get('type').value === FilterType.MUTANT_REGEX;
  }

  isScripted(filter: FormGroup): boolean {
    return filter.get('type').value === FilterType.SCRIPTED;
  }

  isRegEx(filter: FormGroup): boolean {
    return filter.get('type').value === FilterType.REGEX;
  }

  getAttributes(filter: FormGroup): string[] {
    if (filter.get('patterns').value) {
      const parry = filter.get('patterns') as FormArray;
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
    const up = this.filters.controls[index];
    this.filters.controls[index] = this.filters.controls[index - 1];
    this.filters.controls[index - 1] = up;
  }

  moveDown() {
    const index = this.selectedFilter;
    const down = this.filters.controls[index];
    this.filters.controls[index] = this.filters.controls[index + 1];
    this.filters.controls[index + 1] = down;
  }

}
