import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../../messages';
import {Data} from '../../../data';
import {GroovySamlRegisteredServiceAttributeReleasePolicy} from '../../../../../domain/attribute-release';

@Component({
  selector: 'app-groovy-saml',
  templateUrl: './groovy-saml.component.html',
  styleUrls: ['./groovy-saml.component.css']
})
export class GroovySamlComponent implements OnInit {

  policy: GroovySamlRegisteredServiceAttributeReleasePolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy as GroovySamlRegisteredServiceAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
