import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, WsFederationClaimsReleasePolicy} from 'mgmt-lib';
import {AttributeForm} from '../../attribute-form';

export class WsFedReleaseForm extends FormGroup implements MgmtFormGroup<WsFederationClaimsReleasePolicy> {

  constructor(public policy: WsFederationClaimsReleasePolicy) {
    super({
      allowedAttributes: new AttributeForm(policy.allowedAttributes)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      allowedAttributes: (<AttributeForm>this.get('allowedAttributes')).formMap()
    };
  }

  mapForm(policy: WsFederationClaimsReleasePolicy) {
    policy.allowedAttributes = (<AttributeForm>this.get('allowedAttributes')).mapFormString();
  }
}
