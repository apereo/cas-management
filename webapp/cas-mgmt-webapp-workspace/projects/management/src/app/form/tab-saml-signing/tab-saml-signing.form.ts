import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, SigningFrom} from 'mgmt-lib';
import {AbstractRegisteredService, SamlRegisteredService} from 'domain-lib';

export class TabSamlSigningForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get signing() { return this.get('signing') as SigningFrom; }

  constructor(service: SamlRegisteredService) {
    super({
      signing: new SigningFrom(service)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    this.signing.mapForm(service as SamlRegisteredService);
  }

}
