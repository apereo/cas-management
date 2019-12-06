import {UidattrsForm} from '../uidattrs.form';
import {GroovyRegisteredServiceUsernameProvider} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class GroovyUidForm extends UidattrsForm {

  get groovy() { return this.get('groovyScript') as MgmtFormControl; }

  constructor(provider: GroovyRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('groovyScript', new MgmtFormControl(provider && provider.groovyScript));
  }

  mapForm(provider: GroovyRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    provider.groovyScript = this.groovy.value;
  }
}
