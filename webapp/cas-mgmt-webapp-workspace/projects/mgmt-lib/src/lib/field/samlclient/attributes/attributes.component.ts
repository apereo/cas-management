import {Component, Input} from '@angular/core';
import {AttributesForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update Saml Attribtues.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-saml-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributeNameFormatsComponent {

  @Input()
  form: AttributesForm;

  selectedRow;

  display;

  constructor(public config: AppConfigService) {
    this.display = (format?: string): string | undefined =>
        format ? config.options.samlAttributeNameFormats
          .find(v => v.value === format).display : undefined;
  }

  /**
   * Adds an attribute.
   */
  addRow() {
    this.form.addRow();
  }

  /**
   * Removes the attribute at the passed index.
   *
   * @param row - index of row to be removed
   */
  delete(row: number) {
    this.form.removeAt(row);
    this.form.markAsTouched();
  }
}
