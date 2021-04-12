import {Component, Input} from '@angular/core';
import {AttributesForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update attribute value type mappings for SAML attributes.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-value-types',
  templateUrl: './value-types.component.html',
  styleUrls: ['./value-types.component.css']
})
export class ValueTypesComponent {

  @Input()
  form: AttributesForm;

  selectedRow;

  constructor(public config: AppConfigService) {
  }

  /**
   * Adds a new mapping row.
   */
  addRow() {
    this.form.addRow();
  }

  /**
   * Removed the mapping from the index passed.
   *
   * @param row - index of row to be removed.
   */
  delete(row: number) {
    this.form.removeAt(row);
    this.form.markAsTouched();
  }

}
