import {BaseAccessForm} from './base-access-form';
import {
  GroovySurrogateRegisteredServiceAccessStrategy,
  MgmtFormControl
} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class GroovySurrogateAccesForm extends BaseAccessForm<GroovySurrogateRegisteredServiceAccessStrategy> {

  constructor(public strategy: GroovySurrogateRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('groovyScript', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['groovyScript'] = this.strategy.groovyScript;
    return frm;
  }

  mapForm(strategy: GroovySurrogateRegisteredServiceAccessStrategy) {
    const frm = this.value;
    super.mapForm(strategy);
    strategy.groovyScript = frm.groovyScript;
  }
}
