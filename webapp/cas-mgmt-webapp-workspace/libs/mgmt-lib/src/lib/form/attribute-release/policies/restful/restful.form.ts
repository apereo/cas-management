import {AttributeReleaseForm} from '../../attribute-release.form';
import {ReturnRestfulAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

export class RestfulReleseForm extends AttributeReleaseForm {

  get endpoint() { return this.get('endpoint') as MgmtFormControl; }

  constructor(policy: ReturnRestfulAttributeReleasePolicy) {
    super(policy);
    this.addControl('endpoint', new MgmtFormControl(policy?.endpoint));
  }

  mapForm(policy: ReturnRestfulAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.endpoint = this.endpoint.value;
  }
}
