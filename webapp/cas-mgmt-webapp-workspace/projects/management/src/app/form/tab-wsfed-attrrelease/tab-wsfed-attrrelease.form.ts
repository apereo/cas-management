import {FormGroup} from '@angular/forms';
import {AttributesForm, MgmtFormGroup} from 'mgmt-lib';
import {AbstractRegisteredService, WsFederationClaimsReleasePolicy} from 'domain-lib';

export class TabWsFedReleaseForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get attributes() { return this.get('allowedAttributes') as AttributesForm; }

  constructor(public policy: WsFederationClaimsReleasePolicy) {
    super({
      allowedAttributes: new AttributesForm(policy.allowedAttributes)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    this.mapPolicy(service.attributeReleasePolicy as WsFederationClaimsReleasePolicy);
  }

  mapPolicy(policy: WsFederationClaimsReleasePolicy) {
    policy.allowedAttributes = this.attributes.mapFormString();
  }
}
