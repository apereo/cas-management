import {Component, forwardRef, OnInit} from '@angular/core';
import {GroovyRegisteredServiceMultifactorPolicy} from '../../../domain/multifactor';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
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

  policy: GroovyRegisteredServiceMultifactorPolicy;
  original: GroovyRegisteredServiceMultifactorPolicy;
  script: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.policy = data.service.multifactorPolicy as GroovyRegisteredServiceMultifactorPolicy;
    this.original = data.original && data.original.multifactorPolicy as GroovyRegisteredServiceMultifactorPolicy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('script', this.script);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.groovyScript;
    this.script = new MgmtFormControl(this.policy.groovyScript, og);
  }

}
