import {PrincipalAttributeRegisteredServiceUsernameProvider} from 'domain-lib';
import {UidattrsForm} from '../uidattrs.form';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class PrincipalUidForm extends UidattrsForm {

  get attribute() { return this.get('usernameAttribute') as MgmtFormControl; }

  constructor(provider: PrincipalAttributeRegisteredServiceUsernameProvider) {
    super(provider);
    this.addControl('usernameAttribute', new MgmtFormControl(provider?.usernameAttribute));
  }

  mapForm(provider: PrincipalAttributeRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    provider.usernameAttribute = this.attribute.value;
  }
}
