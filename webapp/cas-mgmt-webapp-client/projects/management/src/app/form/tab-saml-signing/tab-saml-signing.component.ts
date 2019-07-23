import { Component } from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlRegisteredService} from 'domain-lib';
import {SamlSigningForm} from '@app/form/tab-saml-signing/saml-signing-form';

@Component({
  selector: 'app-tab-saml-signing',
  templateUrl: './tab-saml-signing.component.html',
  styleUrls: ['./tab-saml-signing.component.css']
})
export class TabSamlSigningComponent {

  saml: SamlSigningForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('saml-signing')) {
      this.saml = this.data.formMap.get('saml-signing') as SamlSigningForm;
      return;
    }
    this.saml = new SamlSigningForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set('saml-signing', this.saml);
  }

}
