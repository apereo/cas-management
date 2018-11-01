import {AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList} from '@angular/core';
import {MatFormField} from '@angular/material';
import {HintComponent} from '../hint/hint.component';

@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements AfterContentInit, OnChanges {

  @Input()
  field: string;

  @Input() change: any;

  @Input() orig: any;

  @ContentChildren(HintComponent, {descendants: true})
  hints: QueryList<HintComponent>;

  @ContentChildren(MatFormField)
  formFields: QueryList<MatFormField>;

  temp: any;

  constructor() { }

  ngAfterContentInit() {
    this.hints.first.difference = this.difference();
    this.hints.first.showDiff.subscribe(d => this.show(d));
    this.ngOnChanges();
  }

  ngOnChanges() {
    if (this.formFields && this.formFields.first) {
      this.formFields.first._elementRef.nativeElement.style.color = this.difference() ? 'blue' : 'inherit';
      this.formFields.first._elementRef.nativeElement.style.fontStyle = this.difference() ? 'italic' : 'inherit';
    }
  }

  difference(): boolean {
    return this.orig && this.change[this.field] !== this.orig[this.field];
  }

  show(orig) {
    if (orig) {
      this.temp = this.change[this.field];
      this.change[this.field] = this.orig[this.field];
    } else {
      this.change[this.field] = this.temp;
    }
    this.ngOnChanges();
  }


}
