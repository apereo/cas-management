import {Component, Input} from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {AttributesForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';
/**
 * Component to display/update custom properties for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  @Input()
  form: AttributesForm;

  selectedRow: number;

  constructor(public config: AppConfigService) {
  }

  /**
   * Adds a new property.
   */
  addRow() {
    this.form.addRow();
  }

  /**
   * Deletes the property at the passed index.
   *
   * @param row - index to remove
   */
  delete(row: number) {
    this.form.removeAt(row);
    this.form.markAsTouched();
  }

  /**
   * Handles autocomplete selection.
   *
   * @param event - autocomplete selection
   */
  selection(event: MatAutocompleteSelectedEvent) {
    const index = event.source.options.toArray().indexOf(event.option);
    const val = this.config.options.registeredServiceProperties[index].defaultValue;
    this.form.rowAt(this.selectedRow).values.setValue(val);
  }
}
