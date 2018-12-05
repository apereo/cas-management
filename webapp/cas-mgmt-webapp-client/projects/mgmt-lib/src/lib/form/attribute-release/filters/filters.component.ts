import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FilterType} from '../../../domain/attribute-filter';
import {FormArray, FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-attribute-release-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {

  selectedFilter: number;

  @ViewChild('accordian')
  accordian: ElementRef;

  @Input()
  control: FormGroup;

  filters: FormArray;

  constructor() {
  }

  ngOnInit() {
    this.filters = this.control.get('filters') as FormArray;
  }

  addRegEx() {
    this.addFilter(new FormGroup({
      type: new MgmtFormControl(FilterType.REGEX),
      pattern: new MgmtFormControl(null),
      order: new MgmtFormControl(null)
    }));
  }

  addMappedRegex() {
    this.addFilter(new FormGroup({
      type: new MgmtFormControl(FilterType.MAPPED_REGEX),
      patterns: new FormArray([]),
      completeMatch: new MgmtFormControl(null),
      excludeUnmappedAttributes: new MgmtFormControl(null),
      caseInsensitve: new MgmtFormControl(null),
      order: new MgmtFormControl(null)
    }));
  }

  addReverseMapped() {
    this.addFilter(new FormGroup({
      type: new MgmtFormControl(FilterType.REVERSE_MAPPED_REGEX),
      patterns: new FormArray([]),
      completeMatch: new MgmtFormControl(null),
      excludeUnmappedAttributes: new MgmtFormControl(null),
      caseInsensitve: new MgmtFormControl(null),
      order: new MgmtFormControl(null)
    }));
  }

  addMutantMappedRegex() {
    this.addFilter(new FormGroup({
      type: new MgmtFormControl(FilterType.MUTANT_REGEX),
      patterns: new FormArray([]),
      completeMatch: new MgmtFormControl(null),
      excludeUnmappedAttributes: new MgmtFormControl(null),
      caseInsensitve: new MgmtFormControl(null),
      order: new MgmtFormControl(null)
    }));
  }

  addScript() {
    this.addFilter(new FormGroup({
      type: new MgmtFormControl(FilterType.SCRIPTED),
      script: new MgmtFormControl(null),
      order: new MgmtFormControl(null)
    }));
  }

  addFilter(filter: FormGroup) {
    this.filters.push(filter);
    this.filters.markAsTouched();
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
      for (let pg of parry.controls) {
        keys.push(pg.get('key').value);
      }
      return keys;
    }
    return [""];
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
