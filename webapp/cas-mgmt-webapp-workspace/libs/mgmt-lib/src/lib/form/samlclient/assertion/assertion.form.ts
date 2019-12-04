import {SamlRegisteredService} from 'domain-lib';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class AssertionForm extends FormGroup {

  get requiredAuthenticationContextClass() { return this.get('requiredAuthenticationContextClass') as MgmtFormControl; }
  get assertionAudiences() { return this.get('assertionAudiences') as MgmtFormControl; }
  get issuerEntityId() { return this.get('issuerEntityId') as MgmtFormControl; }
  get issuerSigningKeyLocation() { return this.get('issuerSigningKeyLocation') as MgmtFormControl; }
  get issuerSigningAlgorithm() { return this.get('issuerSigningAlgorithm') as MgmtFormControl; }
  get skewAllowance() { return this.get('skewAllowance') as MgmtFormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      requiredAuthenticationContextClass: new MgmtFormControl(service && service.requiredAuthenticationContextClass),
      assertionAudiences: new MgmtFormControl(service && service.assertionAudiences),
      issuerEntityId: new MgmtFormControl(service && service.issuerEntityId),
      skewAllowance: new MgmtFormControl(service && service.skewAllowance)
    });
  }

  mapForm(service: SamlRegisteredService) {
    service.requiredAuthenticationContextClass = this.requiredAuthenticationContextClass.value;
    service.assertionAudiences = this.assertionAudiences.value;
    service.issuerEntityId = this.issuerEntityId.value;
  }
}
