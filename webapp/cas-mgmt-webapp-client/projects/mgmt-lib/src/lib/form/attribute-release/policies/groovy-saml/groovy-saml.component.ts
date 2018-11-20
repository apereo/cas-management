import {Component, forwardRef, OnInit} from '@angular/core';
import {GroovySamlRegisteredServiceAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {HasControls} from '../../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-groovy-saml',
  templateUrl: './groovy-saml.component.html',
  styleUrls: ['./groovy-saml.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => GroovySamlComponent)
  }]
})
export class GroovySamlComponent extends HasControls implements OnInit {

  policy: GroovySamlRegisteredServiceAttributeReleasePolicy;
  original: GroovySamlRegisteredServiceAttributeReleasePolicy;
  script: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.attributeReleasePolicy as GroovySamlRegisteredServiceAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as GroovySamlRegisteredServiceAttributeReleasePolicy;
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
