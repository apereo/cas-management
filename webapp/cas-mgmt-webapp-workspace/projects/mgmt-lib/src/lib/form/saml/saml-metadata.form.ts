import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating SAML metadata options.
 *
 * @author Travis Schmidt
 */
export class MetadataForm extends FormGroup {

  get location() { return this.get('location') as FormControl; }
  get maxValidity() { return this.get('maxValidity') as FormControl; }
  get signatureLocation() { return this.get('signatureLocation') as FormControl; }
  get expirationDuration() { return this.get('expirationDuration') as FormControl; }
  get criteriaPattern() { return this.get('criteriaPattern') as FormControl; }
  get criteriaRoles() { return this.get('criteriaRoles') as FormControl; }
  get criteriaDirection() { return this.get('criteriaDirection') as FormControl; }
  get whiteListBlackListPrecedence() { return this.get('whiteListBlackListPrecedence') as FormControl; }
  get requireSignedRoot() { return this.get('requireSignedRoot') as FormControl; }
  get criteriaRemoveEmptyEntitiesDescriptors() { return this.get('criteriaRemoveEmptyEntitiesDescriptors') as FormControl; }
  get criteriaRemoveRolelessEntityDescriptors() { return this.get('criteriaRemoveRolelessEntityDescriptors') as FormControl; }

  constructor(service: SamlRegisteredService) {
    super({
      location: new FormControl(service?.metadataLocation, Validators.required),
      maxValidity: new FormControl(service?.metadataMaxValidity),
      signatureLocation: new FormControl(service?.metadataSignatureLocation),
      expirationDuration: new FormControl(service?.metadataExpirationDuration),
      criteriaPattern: new FormControl(service?.metadataCriteriaPattern),
      criteriaRoles: new FormControl(service?.metadataCriteriaRoles),
      criteriaDirection: new FormControl(service?.metadataCriteriaDirection),
      whiteListBlackListPrecedence: new FormControl(service?.whiteListBlackListPrecedence),
      requireSignedRoot: new FormControl(service?.requireSignedRoot),
      criteriaRemoveEmptyEntitiesDescriptors: new FormControl(service?.metadataCriteriaRemoveEmptyEntitiesDescriptors),
      criteriaRemoveRolelessEntityDescriptors: new FormControl(service?.metadataCriteriaRemoveEmptyEntitiesDescriptors)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - SamlRegisteredService
   */
  map(service: SamlRegisteredService) {
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
