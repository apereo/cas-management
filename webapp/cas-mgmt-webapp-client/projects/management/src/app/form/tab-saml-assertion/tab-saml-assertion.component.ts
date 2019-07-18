import { Component, OnInit } from '@angular/core';
import {DataRecord, SamlRegisteredService} from 'mgmt-lib';
import {SamlAssertionForm} from '@app/form/tab-saml-assertion/saml-form';

@Component({
  selector: 'app-tab-saml-assertion',
  templateUrl: './tab-saml-assertion.component.html',
  styleUrls: ['./tab-saml-assertion.component.css']
})
export class TabSamlAssertionComponent implements OnInit {

  saml: SamlAssertionForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('saml-assertion')) {
      this.saml = this.data.formMap.get('saml-assertion') as SamlAssertionForm;
      return;
    }
    this.saml = new SamlAssertionForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set('saml-assertion', this.saml);
  }

  ngOnInit() {
  }

}
