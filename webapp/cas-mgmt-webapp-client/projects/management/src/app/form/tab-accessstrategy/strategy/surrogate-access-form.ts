import {BaseAccessForm} from './base-access-form';
import {
  SurrogateRegisteredServiceAccessStrategy,
  MgmtFormControl
} from 'mgmt-lib';
import {AttributeForm} from '../../attribut-form';

export class SurrogateAccessForm extends BaseAccessForm<SurrogateRegisteredServiceAccessStrategy> {

  constructor(public strat: SurrogateRegisteredServiceAccessStrategy) {
    super(strat);
    this.addControl('surrogateEnabled', new MgmtFormControl(null));
    this.addControl('attributes', new AttributeForm(strat.surrogateRequiredAttributes));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['surrogateEnabled'] = this.strat.surrogateEnabled;
    frm['attributes'] = (<AttributeForm>this.get('attributes')).formMap();
    return frm;
  }

  mapForm(strat: SurrogateRegisteredServiceAccessStrategy) {
    const frm = this.value;
    super.mapForm(strat);
    strat.surrogateEnabled = frm.surrogateEnabled;
    strat.surrogateRequiredAttributes = (<AttributeForm>this.get('attributes')).mapForm();
  }

}
