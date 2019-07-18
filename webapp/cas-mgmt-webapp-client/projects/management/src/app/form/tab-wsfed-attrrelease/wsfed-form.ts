import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, WsFederationClaimsReleasePolicy} from 'mgmt-lib';
import {AttributeForm} from '@app/form/attribute-form';
import {AbstractRegisteredService} from 'mgmt-lib';

export class WsFedReleaseForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

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

  mapForm(service: AbstractRegisteredService) {
    this.mapPolicy(service.attributeReleasePolicy as WsFederationClaimsReleasePolicy);
  }

  mapPolicy(policy: WsFederationClaimsReleasePolicy) {
    policy.allowedAttributes = (<AttributeForm>this.get('allowedAttributes')).mapFormString();
  }
}
