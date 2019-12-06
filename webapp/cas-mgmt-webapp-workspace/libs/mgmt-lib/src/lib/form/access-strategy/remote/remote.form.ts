import {RemoteEndpointServiceAccessStrategy} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {AccessStrategyForm} from '../access-strategy.form';

export class RemoteForm extends AccessStrategyForm {

  get endpointUrl() { return this.get('endpointUrl') as MgmtFormControl; }
  get responseCodes() { return this.get('responseCodes') as MgmtFormControl; }

  constructor(policy: RemoteEndpointServiceAccessStrategy) {
    super(policy);
    this.addControl('endpointUrl', new MgmtFormControl(policy && policy.endpointUrl));
    this.addControl('responseCodes', new MgmtFormControl(policy && policy.acceptableResponseCodes));
  }

  mapForm(policy: RemoteEndpointServiceAccessStrategy) {
    super.mapForm(policy);
    policy.endpointUrl = this.endpointUrl.value;
    policy.acceptableResponseCodes = this.responseCodes.value;
  }
}
