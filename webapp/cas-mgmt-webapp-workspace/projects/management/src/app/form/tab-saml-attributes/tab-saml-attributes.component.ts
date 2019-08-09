import { Component } from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlRegisteredService} from 'domain-lib';
import {SamlAttributesForm} from '@app/form/tab-saml-attributes/saml-attributes-form';

@Component({
  selector: 'app-tab-saml-attributes',
  templateUrl: './tab-saml-attributes.component.html',
  styleUrls: ['./tab-saml-attributes.component.css']
})
export class TabSamlAttributesComponent {

  saml: SamlAttributesForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('saml-attributes')) {
      this.saml = this.data.formMap.get('saml-attributes') as SamlAttributesForm;
      return;
    }
    this.saml = new SamlAttributesForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set('saml-attributes', this.saml);
  }

}
