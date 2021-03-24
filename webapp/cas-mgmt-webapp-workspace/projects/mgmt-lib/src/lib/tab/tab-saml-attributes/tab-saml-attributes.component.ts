import { Component } from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {TabSamlAttributesForm} from './tab-saml-attributes.form';

/**
 * Component to display/update saml attribute options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-saml-attributes',
  templateUrl: './tab-saml-attributes.component.html',
  styleUrls: ['./tab-saml-attributes.component.css']
})
export class TabSamlAttributesComponent {

  readonly key = 'saml-attributes';
  get tab() { return this.service.form.get(this.key) as TabSamlAttributesForm; }
  set tab(f: TabSamlAttributesForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabSamlAttributesForm(service.registeredService as SamlRegisteredService);
    }
  }

}
