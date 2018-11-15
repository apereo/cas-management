import { Component, OnInit } from '@angular/core';
import {FormData } from '../../../domain/form-data';
import {RegisteredServiceConsentPolicy} from '../../../domain/consent-policy';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-attribute-release-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {
  formData: FormData;

  policy: RegisteredServiceConsentPolicy;
  original: RegisteredServiceConsentPolicy;
  consentEnabled: MgmtFormControl;
  excluded: MgmtFormControl;
  includeOnly: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy && data.service.attributeReleasePolicy.consentPolicy;
    this.original = data.original && data.original.attributeReleasePolicy
      && data.original.attributeReleasePolicy.consentPolicy;
    this.formData = data.formData;
  }

  ngOnInit() {
    this.consentEnabled = new MgmtFormControl(this.policy.enabled, this.original.enabled);
    this.excluded = new MgmtFormControl(this.policy.excludedAttributes, this.original.excludedAttributes);
    this.includeOnly = new MgmtFormControl(this.policy.includeOnlyAttributes, this.original.includeOnlyAttributes);
  }


  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }
}
