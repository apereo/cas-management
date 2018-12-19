import {BaseAttrForm} from './base-attr-form';
import {DefaultRegisteredServiceUsernameProvider} from 'mgmt-lib';

export class DefaultAttrForm extends BaseAttrForm<DefaultRegisteredServiceUsernameProvider> {

  constructor(public data: DefaultRegisteredServiceUsernameProvider) {
    super(data);
    this.setValue(super.formMap());
  }
}
