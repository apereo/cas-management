import { Component, OnInit } from '@angular/core';
import {ScriptedRegisteredServiceAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';

@Component({
  selector: 'lib-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css']
})
export class ScriptComponent implements OnInit {

  policy: ScriptedRegisteredServiceAttributeReleasePolicy;
  original: ScriptedRegisteredServiceAttributeReleasePolicy;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
