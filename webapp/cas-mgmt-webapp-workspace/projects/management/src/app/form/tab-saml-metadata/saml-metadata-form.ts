import {FormGroup, Validators} from '@angular/forms';
import {MgmtFormGroup, MgmtFormControl} from 'mgmt-lib';
import {AbstractRegisteredService, SamlRegisteredService} from 'domain-lib';

export class SamlMetadataForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: SamlRegisteredService) {
    super({
      location: new MgmtFormControl(null, null, Validators.required),
      maxValidity: new MgmtFormControl(null),
      signatureLocation: new MgmtFormControl(null),
      expirationDuration: new MgmtFormControl(null),
      criteriaPattern: new MgmtFormControl(null),
      criteriaDirection: new MgmtFormControl(null),
      criteriaRoles: new MgmtFormControl(null),
      whiteListBlackListPrecedence: new MgmtFormControl(null),
      requireSignedRoot: new MgmtFormControl(null),
      criteriaRemoveEmptyEntitiesDescriptors: new MgmtFormControl(null),
      criteriaRemoveRolelessEntityDescriptors: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    const frm = {
      location: this.service.metadataLocation,
      maxValidity: this.service.metadataMaxValidity,
      signatureLocation: this.service.metadataSignatureLocation,
      expirationDuration: this.service.metadataExpirationDuration,
      criteriaPattern: this.service.metadataCriteriaPattern,
      criteriaDirection: this.service.metadataCriteriaDirection,
      criteriaRoles: this.service.metadataCriteriaRoles,
      whiteListBlackListPrecedence: this.service.whiteListBlackListPrecedence,
      requireSignedRoot: this.service.requireSignedRoot,
      criteriaRemoveEmptyEntitiesDescriptors: this.service.metadataCriteriaRemoveEmptyEntitiesDescriptors,
      criteriaRemoveRolelessEntityDescriptors: this.service.metadataCriteriaRemoveRolelessEntityDescriptors
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
    saml.whiteListBlackListPrecedence = frm.metadata.whiteListBlackListPrecedence;
    saml.requireSignedRoot = frm.metadata.requireSignedRoot;
    saml.metadataCriteriaRemoveEmptyEntitiesDescriptors = frm.metadata.criteriaRemoveEmptyEntitiesDescriptors;
    saml.metadataCriteriaRemoveRolelessEntityDescriptors = frm.metadata.criteriaRemoveRolelessEntityDescriptors;
  }
}
