import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DataRecord} from '../data.model';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {AttributesForm, Row} from './attributes.form';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {

  @Input()
  form: AttributesForm;

  @Input()
  keys: string[];

  @Input()
  values: string[];

  selectedRow;

  @Input()
  defaultToAttributeName: boolean;

  @Input()
  sourceHeader = 'Name';

  @Input()
  valueHeader = 'Value';

  @Output()
  keyChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.form.rows().forEach(v => this.setChangeSubscription(v));
  }

  addRow() {
    const row = this.form.addRow();
    this.setChangeSubscription(row);
  }

  setChangeSubscription(row: Row) {
    row.key.valueChanges.subscribe((value => {
      if (this.defaultToAttributeName) {
        row.key.parent.get('values').setValue(value);
      }
      this.keyChange.emit(row.key.parent as FormGroup);
    }));
  }

  delete(row: number) {
    this.form.removeAt(row);
    this.form.markAsTouched();
  }

  selection(sel: MatAutocompleteSelectedEvent) {
    if (this.defaultToAttributeName) {
      this.form.rowAt(this.selectedRow).values.setValue(sel.option.value);
    }
  }
}
