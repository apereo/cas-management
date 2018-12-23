import {BaseAccessForm} from './base-access-form';
import {
  RemoteEndpointServiceAccessStrategy,
  MgmtFormControl
} from 'mgmt-lib';
import {Validators} from '@angular/forms';

export class RemoteAccessForm extends BaseAccessForm<RemoteEndpointServiceAccessStrategy> {

  constructor(public strategy: RemoteEndpointServiceAccessStrategy) {
    super(strategy);
    this.addControl('endpointUrl', new MgmtFormControl(null, null, Validators.required));
    this.addControl('responseCodes', new MgmtFormControl(null, null, Validators.required));
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = super.formMap();
    frm['endpointUrl'] = this.strategy.endpointUrl;
    frm['responseCodes'] = this.strategy.acceptableResponseCodes;
    return frm;
  }

  mapForm(strat: RemoteEndpointServiceAccessStrategy) {
    const frm = this.value;
    super.mapForm(strat);
    strat.endpointUrl = frm.endpointUrl;
    strat.acceptableResponseCodes = frm.responseCodes;
  }
}
