import {BaseAccessForm} from './base-access-form';
import {DefaultRegisteredServiceAccessStrategy} from 'domain-lib';

export class DefaultAccessForm extends BaseAccessForm<DefaultRegisteredServiceAccessStrategy> {

  constructor(public strategy: DefaultRegisteredServiceAccessStrategy) {
    super(strategy);
    this.setValue(super.formMap());
  }

}
