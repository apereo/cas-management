import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataRecord} from '../data.model';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {AttributesForm, Row} from './attributes.form';
import { GroovyEditorComponent } from '../groovy-editor/groovy-editor.component';
import {FormGroup} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

const GROOVY_SCRIPT_REGEX = /groovy\s*\{(?:[^}{]+|\{(?:[^}{]+|\{[^}{]*\})*\})*\}/g;

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

  GROOVY_SCRIPT_REGEX = GROOVY_SCRIPT_REGEX;

  constructor(public data: DataRecord, public dialog: MatDialog) {
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

  openGroovyEditor(row: Row) {
    const dialogRef = this.dialog.open(GroovyEditorComponent, {
      data: row.values.value,
      width: '600px',
      position: { top: '100px' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result !== 'false') {
        row.values.setValue(result);
      }
    });
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
