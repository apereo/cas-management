import {FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  MgmtFormControl,
  AbstractRegisteredService,
  SamlRegisteredService
} from 'mgmt-lib';

export class SamlAssertionForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: SamlRegisteredService) {
    super({
      nameId: new FormGroup({
        requiredNameIdFormat: new MgmtFormControl(null),
        serviceProviderNameIdQualifier: new MgmtFormControl(null),
        nameIdQualifier: new MgmtFormControl(null)
      }),
      optionalSaml: new FormGroup({
        skipGeneratingAssertionNameId: new MgmtFormControl(null),
        skipGeneratingTransientNameId: new MgmtFormControl(null),
        skipGeneratingSubjectConfirmationInResponseTo: new MgmtFormControl(null),
        skipGeneratingSubjectConfirmationNotOnOrAfter: new MgmtFormControl(null),
        skipGeneratingSubjectConfirmationRecipient: new MgmtFormControl(null),
        skipGeneratingSubjectConfirmationNotBefore: new MgmtFormControl(null),
      }),
      assertion: new FormGroup({
        requiredAuthenticationContextClass: new MgmtFormControl(null),
        assertionAudiences: new MgmtFormControl(null),
        issuerEntityId: new MgmtFormControl(null),
        skewAllowance: new MgmtFormControl(null)
      })
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = {
      nameId: {
        requiredNameIdFormat: this.service.requiredNameIdFormat,
        serviceProviderNameIdQualifier: this.service.serviceProviderNameIdQualifier,
        nameIdQualifier: this.service.nameIdQualifier
      },
      optionalSaml: {
        skipGeneratingAssertionNameId: this.service.skipGeneratingAssertionNameId,
        skipGeneratingTransientNameId: this.service.skipGeneratingTransientNameId,
        skipGeneratingSubjectConfirmationInResponseTo: this.service.skipGeneratingSubjectConfirmationInResponseTo,
        skipGeneratingSubjectConfirmationNotOnOrAfter: this.service.skipGeneratingSubjectConfirmationNotOnOrAfter,
        skipGeneratingSubjectConfirmationRecipient: this.service.skipGeneratingSubjectConfirmationRecipient,
        skipGeneratingSubjectConfirmationNotBefore: this.service.skipGeneratingSubjectConfirmationNotBefore,
      },
      assertion: {
        requiredAuthenticationContextClass: this.service.requiredAuthenticationContextClass,
        assertionAudiences: this.service.assertionAudiences,
        skewAllowance: this.service.skewAllowance,
        issuerEntityId: this.service.issuerEntityId
      }
    };
    return frm;
  }

  mapForm(service: AbstractRegisteredService) {
    const saml: SamlRegisteredService = service as SamlRegisteredService;
    const frm = this.value;
    saml.requiredNameIdFormat = frm.nameId.requiredNameIdFormat;
    saml.serviceProviderNameIdQualifier = frm.nameId.serviceProviderNameIdQualifier;
    saml.nameIdQualifier = frm.nameId.nameIdQualifier;
    saml.skipGeneratingAssertionNameId = frm.optionalSaml.skipGeneratingAssertionNameId;
    saml.skipGeneratingTransientNameId = frm.optionalSaml.skipGeneratignTransientNameId;
    saml.skipGeneratingSubjectConfirmationInResponseTo = frm.optionalSaml.skipGeneratingSubjectConfirmationInResponseTo;
    saml.skipGeneratingSubjectConfirmationNotOnOrAfter = frm.optionalSaml.skipGeneratingSubjectConfirmationNotOnOrAfter;
    saml.skipGeneratingSubjectConfirmationRecipient = frm.optionalSaml.skipGeneratingSubjectConfirmationRecipient;
    saml.skipGeneratingSubjectConfirmationNotBefore = frm.optionalSaml.skipGeneratingSubjectConfirmationNotBefore;
    saml.requiredAuthenticationContextClass = frm.assertion.requiredAuthenticationContextClass;
    saml.assertionAudiences = frm.assertion.assertionAudiences;
    saml.issuerEntityId = frm.assertion.issuerEntityId;
    saml.skewAllowance = frm.assertion.skewAllowance;
  }
}
