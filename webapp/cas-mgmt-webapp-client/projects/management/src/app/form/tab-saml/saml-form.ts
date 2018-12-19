import {FormArray, FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AbstractRegisteredService,
  SamlRegisteredService
} from 'mgmt-lib';

export class SamlForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public data: DataRecord) {
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
        nameIds: new FormArray([])
      })
    });
    const saml: SamlRegisteredService = this.data.service as SamlRegisteredService;
    const nameIds: FormArray = this.get('nameIds') as FormArray;
    if (saml.attributeNameFormats) {
      for (let i = 0; i < Array.from(Object.keys(saml.attributeNameFormats)).length; i++) {
        nameIds.push(new FormGroup({
          key: new MgmtFormControl(null, null, Validators.required),
          value: new MgmtFormControl(null, null, Validators.required)
        }));
      }
    }
    this.setValue(this.formMap());
  }

  formMap(): any {
    const saml: SamlRegisteredService = this.data.service as SamlRegisteredService;
    const frm = {
      metadata: {
        location: saml.metadataLocation,
        maxValidity: saml.metadataMaxValidity,
        signatureLocation: saml.metadataSignatureLocation,
        expirationDuration: saml.metadataExpirationDuration,
        criteriaPattern: saml.metadataCriteriaPattern,
        criteriaDirection: saml.metadataCriteriaDirection,
        criteriaRoles: saml.metadataCriteriaRoles,
        criteriaRemoveEmptyEntitiesDescriptors: saml.metadataCriteriaRemoveEmptyEntitiesDescriptors,
        criteriaRemoveRolelessEntityDescriptors: saml.metadataCriteriaRemoveRolelessEntityDescriptors
      },
      nameId: {
        requiredNameIdFormat: saml.requiredNameIdFormat,
        serviceProviderNameIdQualifier: saml.serviceProviderNameIdQualifier,
        nameIdQualifier: saml.nameIdQualifier
      },
      optionalSaml: {
        skipGeneratingAssertionNameId: saml.skipGeneratingAssertionNameId,
        skipGeneratingSubjectConfirmationInResponseTo: saml.skipGeneratingSubjectConfirmationInResponseTo,
        skipGeneratingSubjectConfirmationNotOnOrAfter: saml.skipGeneratingSubjectConfirmationNotOnOrAfter,
        skipGeneratingSubjectConfirmationRecipient: saml.skipGeneratingSubjectConfirmationRecipient,
        skipGeneratingSubjectConfirmationNotBefore: saml.skipGeneratingSubjectConfirmationNotBefore,
      },
      security: {
        signAssertions: saml.signAssertions,
        signResponses: saml.signResponses,
        encryptAssertions: saml.encryptAssertions,
        signingCredentialType: saml.signingCredentialType,
        requiredAuthenticationContextClass: saml.requiredAuthenticationContextClass,
        assertionAudiences: saml.assertionAudiences
      },
      nameFormats: {
        nameIds: []
      }
    };
    if (saml.attributeNameFormats) {
      for (let n of Array.from(Object.keys(saml.attributeNameFormats))) {
        frm.nameFormats.nameIds.push({
          key: n,
          value: saml.attributeNameFormats[n]
        });
      }
    }
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
    if (frm.nameFormats.nameIds) {
      saml.attributeNameFormats = new Map<String, String>();
      for(let n of frm.nameFormats.nameIds) {
        saml.attributeNameFormats[n.key] = n.value;
      }
    }
  }
}
