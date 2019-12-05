import { Component } from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {SamlRegisteredService} from 'domain-lib';
import {TabSamlAttributesForm} from './tab-saml-attributes.form';

@Component({
  selector: 'app-tab-saml-attributes',
  templateUrl: './tab-saml-attributes.component.html',
  styleUrls: ['./tab-saml-attributes.component.css']
})
export class TabSamlAttributesComponent {

  form: TabSamlAttributesForm;
  readonly key = 'saml-attributes';

  constructor(public data: DataRecord) {
    if (this.data.formMap.has(this.key)) {
      this.form = this.data.formMap.get(this.key) as TabSamlAttributesForm;
      return;
    }
    this.form = new TabSamlAttributesForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set(this.key, this.form);
  }

}
