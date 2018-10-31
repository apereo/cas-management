import { Component, OnInit } from '@angular/core';
import {GroovySamlRegisteredServiceAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';

@Component({
  selector: 'lib-groovy-saml',
  templateUrl: './groovy-saml.component.html',
  styleUrls: ['./groovy-saml.component.css']
})
export class GroovySamlComponent implements OnInit {

  policy: GroovySamlRegisteredServiceAttributeReleasePolicy;
  original: GroovySamlRegisteredServiceAttributeReleasePolicy;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy as GroovySamlRegisteredServiceAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as GroovySamlRegisteredServiceAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
