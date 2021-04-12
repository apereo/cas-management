import { Component } from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {TabSamlEncryptionForm} from './tab-saml-encryption.form';

/**
 * Component to display/update saml encryption options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-saml-encryption',
  templateUrl: './tab-saml-encryption.component.html',
  styleUrls: ['./tab-saml-encryption.component.css']
})
export class TabSamlEncryptionComponent {

  readonly key = 'saml-encryption';
  get tab() { return this.service.form.get(this.key) as TabSamlEncryptionForm; }
  set tab(f: TabSamlEncryptionForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabSamlEncryptionForm(service.registeredService as SamlRegisteredService);
    }
  }

}
