import { Component } from '@angular/core';
import {FormService} from '@apereo/mgmt-lib/src/lib/form';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {TabSamlMetadataForm} from './tab-saml-metadata.form';

/**
 * Component to display/update saml metadata options for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-tab-saml-metadata',
  templateUrl: './tab-saml-metadata.component.html',
  styleUrls: ['./tab-saml-metadata.component.css']
})
export class TabSamlMetadataComponent {

  readonly key = 'saml-metadata';
  get tab() { return this.service.form.get(this.key) as TabSamlMetadataForm; }
  set tab(f: TabSamlMetadataForm) { this.service.form.addControl(this.key, f); }

  /**
   * Starts the component by looking in the data record for an existing form for this tab. If not found
   * a new form is created and inserted in the map.
   */
  constructor(private service: FormService) {
    if (!service.form.contains(this.key)) {
      this.tab = new TabSamlMetadataForm(service.registeredService as SamlRegisteredService);
    }
  }

}
