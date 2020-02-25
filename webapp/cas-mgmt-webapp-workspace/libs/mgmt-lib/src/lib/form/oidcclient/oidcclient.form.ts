import {FormGroup} from '@angular/forms';
import {OidcRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class OidcClientForm extends FormGroup {

  get tokenEndpointAuthenticationMethod() { return this.get('tokenEndpointAuthenticationMethod') as MgmtFormControl; }
  get applicationType() { return this.get('applicationType') as MgmtFormControl; }
  get subjectType() { return this.get('subjectType') as MgmtFormControl; }
  get sectorIdentifierUri() { return this.get('sectorIdentifierUri') as MgmtFormControl; }
  get dynamicRegistrationDateTime() { return this.get('dynamicRegistrationDateTime') as MgmtFormControl; }

  constructor(service: OidcRegisteredService) {
    super({
      tokenEndpointAuthenticationMethod: new MgmtFormControl(service?.tokenEndpointAuthenticationMethod),
      applicationType: new MgmtFormControl(service?.applicationType),
      subjectType: new MgmtFormControl(service?.subjectType),
      sectorIdentifierUri: new MgmtFormControl(service?.sectorIdentifierUri),
      dynamicRegistrationDateTime: new MgmtFormControl(service?.dynamicRegistrationDateTime)
    });
  }

  mapForm(service: OidcRegisteredService) {
    service.tokenEndpointAuthenticationMethod = this.tokenEndpointAuthenticationMethod.value;
    service.applicationType = this.applicationType.value;
    service.subjectType = this.subjectType.value;
    service.sectorIdentifierUri = this.sectorIdentifierUri.value;
    service.dynamicRegistrationDateTime = this.dynamicRegistrationDateTime.value;
  }
}
