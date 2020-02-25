import {SamlRegisteredService} from 'domain-lib';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class AssertionForm extends FormGroup {

  get requiredAuthenticationContextClass() { return this.get('requiredAuthenticationContextClass') as MgmtFormControl; }
  get assertionAudiences() { return this.get('assertionAudiences') as MgmtFormControl; }
  get issuerEntityId() { return this.get('issuerEntityId') as MgmtFormControl; }
  get skewAllowance() { return this.get('skewAllowance') as MgmtFormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      requiredAuthenticationContextClass: new MgmtFormControl(service?.requiredAuthenticationContextClass),
      assertionAudiences: new MgmtFormControl(service?.assertionAudiences),
      issuerEntityId: new MgmtFormControl(service?.issuerEntityId),
      skewAllowance: new MgmtFormControl(service?.skewAllowance)
    });
  }

  mapForm(service: SamlRegisteredService) {
    service.requiredAuthenticationContextClass = this.requiredAuthenticationContextClass.value;
    service.assertionAudiences = this.assertionAudiences.value;
    service.issuerEntityId = this.issuerEntityId.value;
  }
}
