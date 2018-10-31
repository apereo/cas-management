import { Component, OnInit } from '@angular/core';
import {FormData } from '../../../domain/form-data';
import {RegisteredServiceConsentPolicy} from '../../../domain/consent-policy';
import {DataRecord} from '../../data';

@Component({
  selector: 'lib-attribute-release-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {
  formData: FormData;

  policy: RegisteredServiceConsentPolicy;
  original: RegisteredServiceConsentPolicy;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy && data.service.attributeReleasePolicy.consentPolicy;
    this.original = data.original && data.original.attributeReleasePolicy
      && data.original.attributeReleasePolicy.consentPolicy;
    this.formData = data.formData;
  }

  ngOnInit() {
  }


  isEmpty(data: any[]): boolean {
    return !data || data.length === 0;
  }
}
