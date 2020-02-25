import {FormGroup} from '@angular/forms';
import {OidcRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class JwksForm extends FormGroup {

  get jwks() { return this.get('jwks') as MgmtFormControl; }
  get jwksCacheDuration() { return this.get('jwksCacheDuration') as MgmtFormControl; }
  get jwksCacheTimeUnit() { return this.get('jwksCacheTimeUnit') as MgmtFormControl; }

  constructor(service: OidcRegisteredService) {
    super({
      jwks: new MgmtFormControl(service?.jwks),
      jwksCacheDuration: new MgmtFormControl(service?.jwksCacheDuration),
      jwksCacheTimeUnit: new MgmtFormControl(service?.jwksCacheTimeUnit),
    });
  }

  mapForm(service: OidcRegisteredService) {
    service.jwks = this.jwks.value;
    service.jwksCacheDuration = this.jwksCacheDuration.value;
    service.jwksCacheTimeUnit = this.jwksCacheTimeUnit.value;
  }
}
