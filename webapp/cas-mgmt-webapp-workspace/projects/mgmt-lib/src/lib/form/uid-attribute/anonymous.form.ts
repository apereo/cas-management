import {UidattrsForm} from './uidattrs.form';
import {AnonymousRegisteredServiceUsernameProvider, ShibbolethCompatiblePersistentIdGenerator} from '@apereo/mgmt-lib/src/lib/model';
import {FormControl, Validators} from '@angular/forms';

/**
 * Form group displaying and updating anon uid attributes.
 *
 * @author Travis Schmidt
 */
export class AnonymousUidForm extends UidattrsForm {

  get salt() { return this.get('salt') as FormControl; }
  get attribute() { return this.get('attribute') as FormControl; }

  constructor(provider: AnonymousRegisteredServiceUsernameProvider) {
    super(provider);
    const generator = provider && provider.persistentIdGenerator;
    this.addControl('salt', new FormControl(generator?.salt, Validators.required));
    this.addControl('attribute', new FormControl(generator?.attribute, Validators.required));
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param provider - AnonymousRegisteredServiceUsernameProvider
   */
  map(provider: AnonymousRegisteredServiceUsernameProvider) {
    super.map(provider);
    if (this.salt.value || this.attribute.value) {
      const generator = new ShibbolethCompatiblePersistentIdGenerator();
      generator.salt = this.salt.value;
      generator.attribute = this.attribute.value;
      provider.persistentIdGenerator = generator;
    }
  }
}
