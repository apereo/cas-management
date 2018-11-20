import {Component, forwardRef, OnInit} from '@angular/core';
import {ScriptedRegisteredServiceAttributeReleasePolicy} from '../../../../domain/attribute-release';
import {DataRecord} from '../../../data';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {HasControls} from '../../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => ScriptComponent)
  }]
})
export class ScriptComponent extends HasControls implements OnInit {

  policy: ScriptedRegisteredServiceAttributeReleasePolicy;
  original: ScriptedRegisteredServiceAttributeReleasePolicy;
  script: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.attributeReleasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy;
    this.original = data.original && data.original.attributeReleasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('script', this.script);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.scriptFile;
    this.script = new MgmtFormControl(this.policy.scriptFile, og);
  }


}
