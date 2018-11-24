import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  GroovySurrogateRegisteredServiceAccessStrategy
} from '../../../domain/access-strategy';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-groovy-surrogate',
  templateUrl: './groovy-surrogate.component.html',
  styleUrls: ['./groovy-surrogate.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => GroovySurrogateComponent)
  }]
})
export class GroovySurrogateComponent extends HasControls implements OnInit {

  @Input()
  data: GroovySurrogateRegisteredServiceAccessStrategy[];

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
    const og = this.data[1] && this.data[1].groovyScript;
    this.script = new MgmtFormControl(this.data[0].groovyScript, og);
  }

}
