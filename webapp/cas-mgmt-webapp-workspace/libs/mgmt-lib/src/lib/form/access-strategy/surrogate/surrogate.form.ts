import {SurrogateRegisteredServiceAccessStrategy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {AttributesForm} from '../../attributes/attributes.form';
import {AccessStrategyForm} from '../access-strategy.form';

export class SurrogateForm extends AccessStrategyForm {

  get surrogateEnabled() { return this.get('surrogateEnabled') as MgmtFormControl; }
  get surrogateRequiredAttributes() { return this.get('attributes') as AttributesForm; }

  constructor(strategy: SurrogateRegisteredServiceAccessStrategy) {
    super(strategy);
    this.addControl('surrogateEnabled', new MgmtFormControl(strategy?.surrogateEnabled));
    this.addControl('attributes', new AttributesForm(strategy?.surrogateRequiredAttributes));
  }

  mapForm(strategy: SurrogateRegisteredServiceAccessStrategy) {
    super.mapForm(strategy);
    strategy.surrogateRequiredAttributes = this.surrogateRequiredAttributes.mapForm();
    strategy.surrogateEnabled = this.surrogateEnabled.value;
  }
}
