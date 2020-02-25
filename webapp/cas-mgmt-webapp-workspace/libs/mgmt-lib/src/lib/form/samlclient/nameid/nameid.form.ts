import {FormGroup} from '@angular/forms';
import {SamlRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class NameidForm extends FormGroup {

  get requiredNameIdFormat() { return this.get('requiredNameIdFormat') as MgmtFormControl; }
  get serviceProviderNameIdQualifier() { return this.get('serviceProviderNameIdQualifier') as MgmtFormControl; }
  get nameIdQualifier() { return this.get('nameIdQualifier') as MgmtFormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      requiredNameIdFormat: new MgmtFormControl(service?.requiredNameIdFormat),
      serviceProviderNameIdQualifier: new MgmtFormControl(service?.serviceProviderNameIdQualifier),
      nameIdQualifier: new MgmtFormControl(service?.nameIdQualifier)
    });
  }

  mapForm(service: SamlRegisteredService) {
    service.requiredNameIdFormat = this.requiredNameIdFormat.value;
    service.serviceProviderNameIdQualifier = this.serviceProviderNameIdQualifier.value;
    service.nameIdQualifier = this.nameIdQualifier.value;
  }
}
