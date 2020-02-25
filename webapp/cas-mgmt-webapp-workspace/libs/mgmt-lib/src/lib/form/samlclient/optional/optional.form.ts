import {FormGroup} from '@angular/forms';
import {SamlRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class OptionalForm extends FormGroup {

  get skipGeneratingAssertionNameId() { return this.get('skipGeneratingAssertionNameId') as MgmtFormControl; }
  get skipGeneratingSubjectConfirmationInResponseTo() { return this.get('skipGeneratingSubjectConfirmationInResponseTo') as MgmtFormControl; }
  get skipGeneratingSubjectConfirmationNotOnOrAfter() { return this.get('skipGeneratingSubjectConfirmationNotOnOrAfter') as MgmtFormControl; }
  get skipGeneratingSubjectConfirmationRecipient() { return this.get('skipGeneratingSubjectConfirmationRecipient') as MgmtFormControl; }
  get skipGeneratingSubjectConfirmationNotBefore() { return this.get('skipGeneratingSubjectConfirmationNotBefore') as MgmtFormControl; }
  get skipGeneratingTransientNameId() { return this.get('skipGeneratingTransientNameId') as MgmtFormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      skipGeneratingAssertionNameId: new MgmtFormControl(service?.skipGeneratingAssertionNameId),
      skipGeneratingSubjectConfirmationInResponseTo: new MgmtFormControl(service?.skipGeneratingSubjectConfirmationInResponseTo),
      skipGeneratingSubjectConfirmationNotOnOrAfter: new MgmtFormControl(service?.skipGeneratingSubjectConfirmationNotOnOrAfter),
      skipGeneratingSubjectConfirmationRecipient: new MgmtFormControl(service?.skipGeneratingSubjectConfirmationRecipient),
      skipGeneratingSubjectConfirmationNotBefore: new MgmtFormControl(service?.skipGeneratingSubjectConfirmationNotBefore),
      skipGeneratingTransientNameId: new MgmtFormControl(service?.skipGeneratingTransientNameId)
    });
  }

  mapForm(service: SamlRegisteredService) {
    service.skipGeneratingAssertionNameId = this.skipGeneratingAssertionNameId.value;
    service.skipGeneratingSubjectConfirmationInResponseTo = this.skipGeneratingSubjectConfirmationInResponseTo.value;
    service.skipGeneratingSubjectConfirmationNotOnOrAfter = this.skipGeneratingSubjectConfirmationNotOnOrAfter.value;
    service.skipGeneratingSubjectConfirmationRecipient = this.skipGeneratingSubjectConfirmationRecipient.value;
    service.skipGeneratingSubjectConfirmationNotBefore = this.skipGeneratingSubjectConfirmationNotBefore.value;
    service.skipGeneratingTransientNameId = this.skipGeneratingTransientNameId.value;
  }
}
