import { Component, OnInit } from '@angular/core';
import {Messages} from '../../../../messages';
import {Data} from '../../../data';
import {ScriptedRegisteredServiceAttributeReleasePolicy} from '../../../../../domain/attribute-release';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css']
})
export class ScriptComponent implements OnInit {

  policy: ScriptedRegisteredServiceAttributeReleasePolicy;
  original: ScriptedRegisteredServiceAttributeReleasePolicy;

  constructor(public messages: Messages,
              public data: Data) {
    this.policy = data.service.attributeReleasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy;
  }

  ngOnInit() {
  }

}
