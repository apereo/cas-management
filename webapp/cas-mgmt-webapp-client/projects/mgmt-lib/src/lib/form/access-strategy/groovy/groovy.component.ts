import {Component, forwardRef, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {DataRecord} from '../../data';
import {GroovyRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
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

  script: MgmtFormControl;
  strategy: GroovyRegisteredServiceAccessStrategy;
  original: GroovyRegisteredServiceAccessStrategy;

  constructor(private data: DataRecord) {
    super();
    this.strategy = data.service.accessStrategy as GroovyRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as GroovyRegisteredServiceAccessStrategy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('groovyScript', this.script);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.groovyScript;
    this.script = new MgmtFormControl(this.strategy.groovyScript, og);
  }

}
