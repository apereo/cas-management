import {FormControl, FormGroup} from '@angular/forms';
import {WSFederationRegisteredService} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating WS Federation client options.
 *
 * @author Travis Schmidt
 */
export class WsfedclientForm extends FormGroup {

  get realm() { return this.get('realm') as FormControl; }
  get appliesTo() { return this.get('appliesTo') as FormControl; }

  constructor(service: WSFederationRegisteredService) {
    super({
      realm: new FormControl(service?.realm),
      appliesTo: new FormControl(service?.appliesTo)
    });
  }

  /**
   * Maps the form values to the passed DTO.
   *
   * @param service - WSFederationRegisteredService
   */
  map(service: WSFederationRegisteredService) {
    service.realm = this.realm.value;
    service.appliesTo = this.appliesTo.value;
  }
}
