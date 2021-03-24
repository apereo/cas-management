import {FormControl, FormGroup} from '@angular/forms';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating optional SAML options.
 *
 * @author Travis Schmidt
 */
export class OptionalForm extends FormGroup {

  get skipGeneratingAssertionNameId() { return this.get('skipGeneratingAssertionNameId') as FormControl; }
  get skipGeneratingSubjectConfirmationInResponseTo()
    { return this.get('skipGeneratingSubjectConfirmationInResponseTo') as FormControl; }
  get skipGeneratingSubjectConfirmationNotOnOrAfter()
    { return this.get('skipGeneratingSubjectConfirmationNotOnOrAfter') as FormControl; }
  get skipGeneratingSubjectConfirmationRecipient() { return this.get('skipGeneratingSubjectConfirmationRecipient') as FormControl; }
  get skipGeneratingSubjectConfirmationNotBefore() { return this.get('skipGeneratingSubjectConfirmationNotBefore') as FormControl; }
  get skipGeneratingTransientNameId() { return this.get('skipGeneratingTransientNameId') as FormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      skipGeneratingAssertionNameId: new FormControl(service?.skipGeneratingAssertionNameId),
      skipGeneratingSubjectConfirmationInResponseTo: new FormControl(service?.skipGeneratingSubjectConfirmationInResponseTo),
      skipGeneratingSubjectConfirmationNotOnOrAfter: new FormControl(service?.skipGeneratingSubjectConfirmationNotOnOrAfter),
      skipGeneratingSubjectConfirmationRecipient: new FormControl(service?.skipGeneratingSubjectConfirmationRecipient),
      skipGeneratingSubjectConfirmationNotBefore: new FormControl(service?.skipGeneratingSubjectConfirmationNotBefore),
      skipGeneratingTransientNameId: new FormControl(service?.skipGeneratingTransientNameId)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - SamlRegisteredService
   */
  map(service: SamlRegisteredService) {
    service.skipGeneratingAssertionNameId = this.skipGeneratingAssertionNameId.value;
    service.skipGeneratingSubjectConfirmationInResponseTo = this.skipGeneratingSubjectConfirmationInResponseTo.value;
    service.skipGeneratingSubjectConfirmationNotOnOrAfter = this.skipGeneratingSubjectConfirmationNotOnOrAfter.value;
    service.skipGeneratingSubjectConfirmationRecipient = this.skipGeneratingSubjectConfirmationRecipient.value;
    service.skipGeneratingSubjectConfirmationNotBefore = this.skipGeneratingSubjectConfirmationNotBefore.value;
    service.skipGeneratingTransientNameId = this.skipGeneratingTransientNameId.value;
  }
}
