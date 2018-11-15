import { Component, OnInit } from '@angular/core';
import {ScriptedRegisteredServiceAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

@Component({
  selector: 'lib-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css']
})
export class ScriptComponent implements OnInit {

  policy: ScriptedRegisteredServiceAttributeReleasePolicy;
  original: ScriptedRegisteredServiceAttributeReleasePolicy;
  script: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy;
  }

  ngOnInit() {
    this.script = new MgmtFormControl(this.policy.scriptFile, this.original.scriptFile);
  }


}
