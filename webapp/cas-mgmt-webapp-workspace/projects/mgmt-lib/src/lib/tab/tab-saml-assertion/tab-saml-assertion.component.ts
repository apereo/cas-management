import { Component } from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {TabSamlAssertionForm} from './tab-saml.form';

/**
 * Component to display/update saml assertion options in a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-saml-assertion',
  templateUrl: './tab-saml-assertion.component.html',
  styleUrls: ['./tab-saml-assertion.component.css']
})
export class TabSamlAssertionComponent {

  readonly key = 'saml-assertion';
  get tab() { return this.service.form.get(this.key) as TabSamlAssertionForm; }
  set tab(f: TabSamlAssertionForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabSamlAssertionForm(service.registeredService as SamlRegisteredService);
    }
  }

}
