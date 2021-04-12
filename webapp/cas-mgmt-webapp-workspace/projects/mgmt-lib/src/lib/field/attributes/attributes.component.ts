import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {AttributesForm, Row} from '@apereo/mgmt-lib/src/lib/form';
import {FormGroup} from '@angular/forms';
import {GroovyEditorComponent} from '../groovy-editor/groovy-editor.component';
import {MatDialog} from '@angular/material/dialog';

/**
 * Component used to display and update key value pairs.  Usesd most for selecting attributes for release and mapping.
 *
 * @author Travis Schmidt
 */
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

  constructor(public dialog: MatDialog) {
  }

  /**
   * Starts the component by registering change subscriptions to each row in the form.
   */
  ngOnInit() {
    this.form.rows().forEach(v => this.setChangeSubscription(v));
  }

  /**
   * Adds a new attribute to the list.
   */
  addRow() {
    const row = this.form.addRow();
    this.setChangeSubscription(row);
  }

  /**
   * Adds change handler this is subscribed to each row's key value.
   *
   * @param row - row in the form.
   */
  setChangeSubscription(row: Row) {
    row.key.valueChanges.subscribe((value => {
      if (this.defaultToAttributeName) {
        row.values.setValue(value);
      }
      this.keyChange.emit(row.key.parent as FormGroup);
    }));
  }

  /**
   * Opens groovy editor.
   *
   * @param row - the row
   */
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

  /**
   * Deletes a row from the form.
   *
   * @param row - index of row to remove
   */
  delete(row: number) {
    this.form.removeAt(row);
    this.form.markAsTouched();
  }

  /**
   * Handles selection of key and inserts default value.
   *
   * @param sel - autocomplete selection
   */
  selection(sel: MatAutocompleteSelectedEvent) {
    if (this.defaultToAttributeName) {
      this.form.rowAt(this.selectedRow).values.setValue(sel.option.value);
    }
  }
}
