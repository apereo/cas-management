import {Component, forwardRef, OnInit} from '@angular/core';
import {DataRecord} from '../../data';
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

  accessStrategy: GroovySurrogateRegisteredServiceAccessStrategy;
  original: GroovySurrogateRegisteredServiceAccessStrategy;
  script: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.accessStrategy = data.service.accessStrategy as GroovySurrogateRegisteredServiceAccessStrategy;
    this.original = data.original && data.original.accessStrategy as GroovySurrogateRegisteredServiceAccessStrategy;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('groovyScript', this.script);
    return c;
  }

  ngOnInit() {
    const og = this.original && this.original.groovyScript;
    this.script = new MgmtFormControl(this.accessStrategy.groovyScript, og);
  }

}
