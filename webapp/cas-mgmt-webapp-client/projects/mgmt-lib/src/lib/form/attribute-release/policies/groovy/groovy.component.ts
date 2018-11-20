import {Component, forwardRef, OnInit} from '@angular/core';
import {
  GroovyScriptAttributeReleasePolicy
} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {HasControls} from '../../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-groovy',
  templateUrl: './groovy.component.html',
  styleUrls: ['./groovy.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => GroovyComponent)
  }]
})
export class GroovyComponent extends HasControls implements OnInit {

  policy: GroovyScriptAttributeReleasePolicy;
  original: GroovyScriptAttributeReleasePolicy;
  script: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.attributeReleasePolicy as GroovyScriptAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as GroovyScriptAttributeReleasePolicy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('groovyScript', this.script);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.groovyScript;
    this.script = new MgmtFormControl(this.policy.groovyScript, og);
  }

}
