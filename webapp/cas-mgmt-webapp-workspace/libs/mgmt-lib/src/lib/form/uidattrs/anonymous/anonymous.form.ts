import {UidattrsForm} from '../uidattrs.form';
import {AnonymousRegisteredServiceUsernameProvider, ShibbolethCompatiblePersistentIdGenerator} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class AnonymousUidForm extends UidattrsForm {

  get salt() { return this.get('salt') as MgmtFormControl; }
  get attribute() { return this.get('attribute') as MgmtFormControl; }

  constructor(provider: AnonymousRegisteredServiceUsernameProvider) {
    super(provider);
    const generator = provider && provider.persistentIdGenerator;
    this.addControl('salt', new MgmtFormControl(generator?.salt));
    this.addControl('attribute', new MgmtFormControl(generator?.attribute));
  }

  mapForm(provider: AnonymousRegisteredServiceUsernameProvider) {
    super.mapForm(provider);
    if (this.salt.value || this.attribute.value) {
      const generator = new ShibbolethCompatiblePersistentIdGenerator();
      generator.salt = this.salt.value;
      generator.attribute = this.attribute.value;
      provider.persistentIdGenerator = generator;
    }
  }
}
