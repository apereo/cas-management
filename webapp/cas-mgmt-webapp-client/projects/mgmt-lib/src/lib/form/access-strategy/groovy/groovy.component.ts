import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {GroovyRegisteredServiceAccessStrategy} from '../../../domain/access-strategy';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';
import {ControlInput} from '../../control-input';

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

  @Input()
  data: ControlInput<GroovyRegisteredServiceAccessStrategy>;

  script: MgmtFormControl;

  constructor() {
    super();
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('groovyScript', this.script);
    return c;
  }

  ngOnInit() {
    const og = this.data.previous && this.data.previous.groovyScript
    this.script = new MgmtFormControl(this.data.current.groovyScript, og);
  }

}
