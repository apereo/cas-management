import {FormGroup, Validators} from '@angular/forms';
import {SamlRegisteredService} from 'domain-lib';
import {MgmtFormControl} from '../../mgmt-formcontrol';

export class MetadataForm extends FormGroup {

  get location() { return this.get('location') as MgmtFormControl; }
  get maxValidity() { return this.get('maxValidity') as MgmtFormControl; }
  get signatureLocation() { return this.get('signatureLocation') as MgmtFormControl; }
  get expirationDuration() { return this.get('expirationDuration') as MgmtFormControl; }
  get criteriaPattern() { return this.get('criteriaPattern') as MgmtFormControl; }
  get criteriaRoles() { return this.get('criteriaRoles') as MgmtFormControl; }
  get criteriaDirection() { return this.get('criteriaDirection') as MgmtFormControl; }
  get whiteListBlackListPrecedence() { return this.get('whiteListBlackListPrecedence') as MgmtFormControl; }
  get requireSignedRoot() { return this.get('requireSignedRoot') as MgmtFormControl; }
  get criteriaRemoveEmptyEntitiesDescriptors() { return this.get('criteriaRemoveEmptyEntitiesDescriptors') as MgmtFormControl; }
  get criteriaRemoveRolelessEntityDescriptors() { return this.get('criteriaRemoveRolelessEntityDescriptors') as MgmtFormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      location: new MgmtFormControl(service?.metadataLocation, null, Validators.required),
      maxValidity: new MgmtFormControl(service?.metadataMaxValidity),
      signatureLocation: new MgmtFormControl(service?.metadataSignatureLocation),
      expirationDuration: new MgmtFormControl(service?.metadataExpirationDuration),
      criteriaPattern: new MgmtFormControl(service?.metadataCriteriaPattern),
      criteriaRoles: new MgmtFormControl(service?.metadataCriteriaRoles),
      criteriaDirection: new MgmtFormControl(service?.metadataCriteriaDirection),
      whiteListBlackListPrecedence: new MgmtFormControl(service?.whiteListBlackListPrecedence),
      requireSignedRoot: new MgmtFormControl(service?.requireSignedRoot),
      criteriaRemoveEmptyEntitiesDescriptors: new MgmtFormControl(service?.metadataCriteriaRemoveEmptyEntitiesDescriptors),
      criteriaRemoveRolelessEntityDescriptors: new MgmtFormControl(service?.metadataCriteriaRemoveEmptyEntitiesDescriptors)
    });
  }

  mapForm(service: SamlRegisteredService) {
    service.metadataLocation = this.location.value;
    service.metadataMaxValidity = this.maxValidity.value;
    service.metadataSignatureLocation = this.signatureLocation.value;
    service.metadataExpirationDuration = this.expirationDuration.value;
    service.metadataCriteriaPattern = this.criteriaPattern.value;
    service.metadataCriteriaRoles = this.criteriaRoles.value;
    service.metadataCriteriaDirection = this.criteriaDirection.value;
    service.whiteListBlackListPrecedence = this.whiteListBlackListPrecedence.value;
    service.requireSignedRoot = this.requireSignedRoot.value;
    service.metadataCriteriaRemoveEmptyEntitiesDescriptors = this.criteriaRemoveEmptyEntitiesDescriptors.value;
    service.metadataCriteriaRemoveRolelessEntityDescriptors = this.criteriaRemoveRolelessEntityDescriptors.value;
  }
}
