import {BaseAttrForm} from './base-attr-form';
import {DefaultRegisteredServiceUsernameProvider} from 'domain-lib';

export class DefaultAttrForm extends BaseAttrForm<DefaultRegisteredServiceUsernameProvider> {

  constructor(public provider: DefaultRegisteredServiceUsernameProvider) {
    super(provider);
    this.setValue(super.formMap());
  }
}
