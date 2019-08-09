import { Component } from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlRegisteredService} from 'domain-lib';
import {SamlEncryptionForm} from '@app/form/tab-saml-encryption/saml-encryption-form';

@Component({
  selector: 'app-tab-saml-encryption',
  templateUrl: './tab-saml-encryption.component.html',
  styleUrls: ['./tab-saml-encryption.component.css']
})
export class TabSamlEncryptionComponent {

  saml: SamlEncryptionForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('saml-encryption')) {
      this.saml = this.data.formMap.get('saml-encryption') as SamlEncryptionForm;
      return;
    }
    this.saml = new SamlEncryptionForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set('saml-encryption', this.saml);
  }

}
