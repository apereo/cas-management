import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {RegisteredServiceConsentPolicy} from 'domain-lib';

export class ConsentForm extends FormGroup {

  get consentEnabled() { return this.get('enabled') as MgmtFormControl; }
  get excluded() { return this.get('excludedAttributes') as MgmtFormControl; }
  get includeOnly() { return this.get('includeOnlyAttributes') as MgmtFormControl; }

  constructor(policy: RegisteredServiceConsentPolicy) {
    super({
      enabled: new MgmtFormControl(policy?.enabled),
      excludedAttributes: new MgmtFormControl(policy?.excludedAttributes),
      includeOnlyAttributes: new MgmtFormControl(policy?.includeOnlyAttributes)
    });
  }

  mapForm(policy: RegisteredServiceConsentPolicy) {
    policy.enabled = this.consentEnabled.value;
    policy.excludedAttributes = this.excluded.value;
    policy.includeOnlyAttributes = this.includeOnly.value;
  }
}
