import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlRegisteredService} from 'domain-lib';
import {TabSamlMetadataForm} from './tab-saml-metadata.form';

@Component({
  selector: 'app-tab-saml-metadata',
  templateUrl: './tab-saml-metadata.component.html',
  styleUrls: ['./tab-saml-metadata.component.css']
})
export class TabSamlMetadataComponent {

  form: TabSamlMetadataForm;
  readonly key = 'saml-metadata';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabSamlMetadataForm;
      return;
    }
    this.form = new TabSamlMetadataForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set(this.key, this.form);
  }

}
