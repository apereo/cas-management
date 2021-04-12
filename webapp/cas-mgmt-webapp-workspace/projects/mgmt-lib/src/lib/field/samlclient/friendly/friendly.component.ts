import {Component, Input} from '@angular/core';
import {AttributesForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to displau/update friendly name mappings for SAML attributes.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-friendly',
  templateUrl: './friendly.component.html',
  styleUrls: ['./friendly.component.css']
})
export class FriendlyComponent {

  @Input()
  form: AttributesForm;

  selectedRow;

  constructor() {
  }

  /**
   * Adds a new mapping.
   */
  addRow() {
    this.form.addRow();
  }

  /**
   * Deletes the mapping at the passed index.
   *
   * @param row - index of row to be deleted
   */
  delete(row: number) {
    this.form.removeAt(row);
    this.form.markAsTouched();
  }

}
