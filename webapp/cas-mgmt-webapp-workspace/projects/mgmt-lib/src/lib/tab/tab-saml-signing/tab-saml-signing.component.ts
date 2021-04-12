import { Component } from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {TabSamlSigningForm} from './tab-saml-signing.form';

/**
 * Component to display/update saml signing options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-saml-signing',
  templateUrl: './tab-saml-signing.component.html',
  styleUrls: ['./tab-saml-signing.component.css']
})
export class TabSamlSigningComponent {

  readonly key = 'saml-signing';
  get tab() { return this.service.form.get(this.key) as TabSamlSigningForm; }
  set tab(f: TabSamlSigningForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabSamlSigningForm(service.registeredService as SamlRegisteredService);
    }
  }

}
