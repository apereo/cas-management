import {AttributeReleaseForm} from '../../attribute-release.form';
import {ReturnAllowedAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

export class AllowedReleasedForm extends AttributeReleaseForm {

  get allowed() { return this.get('allowed') as MgmtFormControl; }

  constructor(policy: ReturnAllowedAttributeReleasePolicy) {
    super(policy);
    this.addControl('allowed', new MgmtFormControl(policy?.allowedAttributes));
  }

  mapForm(policy: ReturnAllowedAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.allowedAttributes = this.allowed.value;
  }
}
