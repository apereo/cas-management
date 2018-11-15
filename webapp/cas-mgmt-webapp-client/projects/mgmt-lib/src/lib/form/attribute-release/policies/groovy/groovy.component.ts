import { Component, OnInit } from '@angular/core';
import {
  GroovyScriptAttributeReleasePolicy
} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html',
  styleUrls: ['./groovy.component.css']
})
export class GroovyComponent implements OnInit {

  policy: GroovyScriptAttributeReleasePolicy;
  original: GroovyScriptAttributeReleasePolicy;
  script: MgmtFormControl;

  constructor(public data: DataRecord) {
    this.policy = data.service.attributeReleasePolicy as GroovyScriptAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as GroovyScriptAttributeReleasePolicy;
  }

  ngOnInit() {
    this.script = new MgmtFormControl(this.policy.groovyScript, this.original.groovyScript);
  }

}
