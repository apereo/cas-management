import {FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AbstractRegisteredService,
  SamlRegisteredService
} from 'mgmt-lib';
import {AttributeForm} from '../attribute-form';

export class SamlForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: SamlRegisteredService) {
    super({
      metadata: new FormGroup({
        location: new MgmtFormControl(null, null, Validators.required),
        maxValidity: new MgmtFormControl(null),
        signatureLocation: new MgmtFormControl(null),
        expirationDuration: new MgmtFormControl(null),
        criteriaPattern: new MgmtFormControl(null),
        criteriaDirection: new MgmtFormControl(null),
        criteriaRoles: new MgmtFormControl(null),
        criteriaRemoveEmptyEntitiesDescriptors: new MgmtFormControl(null),
        criteriaRemoveRolelessEntityDescriptors: new MgmtFormControl(null)
      }),
      nameId: new FormGroup({
        requiredNameIdFormat: new MgmtFormControl(null),
        serviceProviderNameIdQualifier: new MgmtFormControl(null),
        nameIdQualifier: new MgmtFormControl(null)
      }),
      optionalSaml: new FormGroup({
        skipGeneratingAssertionNameId: new MgmtFormControl(null),
        skipGeneratingSubjectConfirmationInResponseTo: new MgmtFormControl(null),
        skipGeneratingSubjectConfirmationNotOnOrAfter: new MgmtFormControl(null),
        skipGeneratingSubjectConfirmationRecipient: new MgmtFormControl(null),
        skipGeneratingSubjectConfirmationNotBefore: new MgmtFormControl(null),
      }),
      security: new FormGroup({
        signAssertions: new MgmtFormControl(null),
        signResponses: new MgmtFormControl(null),
        encryptAssertions: new MgmtFormControl(null),
        signingCredentialType: new MgmtFormControl(null),
        requiredAuthenticationContextClass: new MgmtFormControl(null),
        assertionAudiences: new MgmtFormControl(null)
      }),
      nameFormats: new FormGroup({
        nameIds: new AttributeForm(service.attributeNameFormats)
      })
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = {
      metadata: {
        location: this.service.metadataLocation,
        maxValidity: this.service.metadataMaxValidity,
        signatureLocation: this.service.metadataSignatureLocation,
        expirationDuration: this.service.metadataExpirationDuration,
        criteriaPattern: this.service.metadataCriteriaPattern,
        criteriaDirection: this.service.metadataCriteriaDirection,
        criteriaRoles: this.service.metadataCriteriaRoles,
        criteriaRemoveEmptyEntitiesDescriptors: this.service.metadataCriteriaRemoveEmptyEntitiesDescriptors,
        criteriaRemoveRolelessEntityDescriptors: this.service.metadataCriteriaRemoveRolelessEntityDescriptors
      },
      nameId: {
        requiredNameIdFormat: this.service.requiredNameIdFormat,
        serviceProviderNameIdQualifier: this.service.serviceProviderNameIdQualifier,
        nameIdQualifier: this.service.nameIdQualifier
      },
      optionalSaml: {
        skipGeneratingAssertionNameId: this.service.skipGeneratingAssertionNameId,
        skipGeneratingSubjectConfirmationInResponseTo: this.service.skipGeneratingSubjectConfirmationInResponseTo,
        skipGeneratingSubjectConfirmationNotOnOrAfter: this.service.skipGeneratingSubjectConfirmationNotOnOrAfter,
        skipGeneratingSubjectConfirmationRecipient: this.service.skipGeneratingSubjectConfirmationRecipient,
        skipGeneratingSubjectConfirmationNotBefore: this.service.skipGeneratingSubjectConfirmationNotBefore,
      },
      security: {
        signAssertions: this.service.signAssertions,
        signResponses: this.service.signResponses,
        encryptAssertions: this.service.encryptAssertions,
        signingCredentialType: this.service.signingCredentialType,
        requiredAuthenticationContextClass: this.service.requiredAuthenticationContextClass,
        assertionAudiences: this.service.assertionAudiences
      },
      nameFormats: {
        nameIds: (<AttributeForm>this.get('nameIds')).formMap()
      }
    };
    return frm;
  }

  mapForm(service: AbstractRegisteredService) {
    const saml: SamlRegisteredService = service as SamlRegisteredService;
    const frm = this.value;
    saml.metadataLocation = frm.metadata.location;
    saml.metadataMaxValidity = frm.metadata.maxValidity;
    saml.metadataSignatureLocation = frm.metadata.signatureLocation;
    saml.metadataExpirationDuration = frm.metadata.expirationDuration;
    saml.metadataCriteriaPattern = frm.metadata.criteriaPattern;
    saml.metadataCriteriaDirection = frm.metadata.criteriaDirection;
    saml.metadataCriteriaRoles = frm.metadata.criteriaRoles;
    saml.metadataCriteriaRemoveEmptyEntitiesDescriptors = frm.metadata.criteriaRemoveEmptyEntitiesDescriptors;
    saml.metadataCriteriaRemoveRolelessEntityDescriptors = frm.metadata.criteriaRemoveRolelessEntityDescriptors;
    saml.requiredNameIdFormat = frm.nameId.requiredNameIdFormat;
    saml.serviceProviderNameIdQualifier = frm.nameId.serviceProviderNameIdQualifier;
    saml.nameIdQualifier = frm.nameId.nameIdQualifier;
    saml.skipGeneratingAssertionNameId = frm.optionalSaml.skipGeneratingAssertionNameId;
    saml.skipGeneratingSubjectConfirmationInResponseTo = frm.optionalSaml.skipGeneratingSubjectConfirmationInResponseTo;
    saml.skipGeneratingSubjectConfirmationNotOnOrAfter = frm.optionalSaml.skipGeneratingSubjectConfirmationNotOnOrAfter;
    saml.skipGeneratingSubjectConfirmationRecipient = frm.optionalSaml.skipGeneratingSubjectConfirmationRecipient;
    saml.skipGeneratingSubjectConfirmationNotBefore = frm.optionalSaml.skipGeneratingSubjectConfirmationNotBefore;
    saml.signAssertions = frm.security.signAssertions;
    saml.signResponses = frm.security.signResponses;
    saml.encryptAssertions = frm.security.encryptAssertions;
    saml.signingCredentialType = frm.security.signingCredentialType;
    saml.requiredAuthenticationContextClass = frm.security.requiredAuthenticationContextClass;
    saml.assertionAudiences = frm.security.assertionAudiences;
    saml.attributeNameFormats = (<AttributeForm>this.get('nameIds')).mapFormString();
  }
}
