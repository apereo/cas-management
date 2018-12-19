import {BaseAccessForm} from './base-access-form';
import {DefaultRegisteredServiceAccessStrategy} from 'mgmt-lib';

export class DefaultAccessForm extends BaseAccessForm<DefaultRegisteredServiceAccessStrategy> {

  constructor(public strat: DefaultRegisteredServiceAccessStrategy) {
    super(strat);
    this.setValue(super.formMap());
  }

}
