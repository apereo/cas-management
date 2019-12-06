import { Component } from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlRegisteredService} from 'domain-lib';
import {TabSamlEncryptionForm} from './tab-saml-encryption.form';

@Component({
  selector: 'app-tab-saml-encryption',
  templateUrl: './tab-saml-encryption.component.html',
  styleUrls: ['./tab-saml-encryption.component.css']
})
export class TabSamlEncryptionComponent {

  form: TabSamlEncryptionForm;
  readonly key = 'saml-encryption';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabSamlEncryptionForm;
      return;
    }
    this.form = new TabSamlEncryptionForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set(this.key, this.form);
  }

}
