import {BaseAccessForm} from './base-access-form';
import {
  GroovyRegisteredServiceAccessStrategy,
  MgmtFormControl
} from 'mgmt-lib';

export class GroovyAccessForm extends BaseAccessForm<GroovyRegisteredServiceAccessStrategy> {

  constructor(public strat: GroovyRegisteredServiceAccessStrategy) {
    super(strat);
    this.addControl('groovyScript', new MgmtFormControl(null));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['groovyScript'] = this.strat.groovyScript;
    return frm;
  }

  mapForm(strat: GroovyRegisteredServiceAccessStrategy) {
    const frm = this.value;
    super.mapForm(strat);
    strat.groovyScript = frm.groovyScript;
  }
}
