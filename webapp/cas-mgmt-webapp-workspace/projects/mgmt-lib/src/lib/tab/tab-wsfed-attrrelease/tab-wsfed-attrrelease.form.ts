import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, WsFederationClaimsReleasePolicy} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, AttributesForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating WS Fed attribute release options for a service.
 *
 * @author Travis Schmidt
 */
export class TabWsFedReleaseForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get attributes() { return this.get('allowedAttributes') as AttributesForm; }
  set attributes(c: AttributesForm) { this.setControl('allowedAttributes', c); }

  constructor(private policy: WsFederationClaimsReleasePolicy) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  rest(): void {
    this.attributes = new AttributesForm(this.policy.allowedAttributes);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    this.mapPolicy(service.attributeReleasePolicy as WsFederationClaimsReleasePolicy);
  }

  /**
   * Maps the form values to the passed policy.
   *
   * @param policy - WsFederationClaimsReleasePolicy
   */
  mapPolicy(policy: WsFederationClaimsReleasePolicy) {
    policy.allowedAttributes = this.attributes.mapString();
  }
}
