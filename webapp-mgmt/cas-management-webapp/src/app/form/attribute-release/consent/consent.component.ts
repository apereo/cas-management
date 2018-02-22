import { Component, OnInit } from '@angular/core';
import {Data} from '../../data';
import {FormData } from '../../../../domain/form-data';
import {Messages} from '../../../messages';
import {RegisteredServiceConsentPolicy} from '../../../../domain/consent-policy';

@Component({
  selector: 'app-attribute-release-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {
  formData: FormData;

  policy: RegisteredServiceConsentPolicy;
  origPolicy: RegisteredServiceConsentPolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy && data.service.attributeReleasePolicy.consentPolicy;
    this.origPolicy = data.diff && data.diff.attributeReleasePolicy && data.diff.attributeReleasePolicy.consentPolicy;
    this.formData = data.formData;
  }

  ngOnInit() {
  }


  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }
}
