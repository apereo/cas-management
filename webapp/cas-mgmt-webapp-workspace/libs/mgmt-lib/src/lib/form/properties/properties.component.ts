import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../form-data.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {AttributesForm} from '../attributes/attributes.form';

@Component({
  selector: 'lib-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  @Input()
  form: AttributesForm;

  selectedRow: number;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
  }

  addRow() {
    this.form.addRow();
  }

  delete(row: number) {
    this.form.removeAt(row);
    this.form.markAsTouched();
  }

  selection(event: MatAutocompleteSelectedEvent) {
    const index = event.source.options.toArray().indexOf(event.option);
    const val = this.formData.options.registeredServiceProperties[index].defaultValue;
    this.form.rowAt(this.selectedRow).values.setValue(val);
  }
}
