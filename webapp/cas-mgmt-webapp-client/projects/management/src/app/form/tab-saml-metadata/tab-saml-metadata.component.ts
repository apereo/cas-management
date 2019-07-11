import { Component, OnInit } from '@angular/core';
import {DataRecord, SamlRegisteredService} from 'mgmt-lib';
import {SamlMetadataForm} from '@app/form/tab-saml-metadata/saml-metadata-form';

@Component({
  selector: 'app-tab-saml-metadata',
  templateUrl: './tab-saml-metadata.component.html',
  styleUrls: ['./tab-saml-metadata.component.css']
})
export class TabSamlMetadataComponent implements OnInit {

  saml: SamlMetadataForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('saml-metadata')) {
      this.saml = this.data.formMap.get('saml-metadata') as SamlMetadataForm;
      return;
    }
    this.saml = new SamlMetadataForm(this.data.service as SamlRegisteredService);
    this.data.formMap.set('saml-metadata', this.saml);
  }
  ngOnInit() {
  }

}
