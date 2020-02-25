import {AttributeReleaseForm} from '../../attribute-release.form';
import {SamlIdpRegisteredServiceAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

export class SamlIdpReleaseForm extends AttributeReleaseForm {

  get allowed() { return this.get('allowed') as MgmtFormControl; }

  constructor(policy: SamlIdpRegisteredServiceAttributeReleasePolicy) {
    super(policy);
    this.addControl('allowed', new MgmtFormControl(policy?.allowedAttributes));
  }

  mapForm(policy: SamlIdpRegisteredServiceAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.allowedAttributes = this.allowed.value;
  }
}
