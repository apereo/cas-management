import {FormGroup} from '@angular/forms';
import {WSFederationRegisterdService} from 'domain-lib';
import {MgmtFormControl} from '../mgmt-formcontrol';

export class WsfedclientForm extends FormGroup {

  get realm() { return this.get('realm') as MgmtFormControl; }
  get appliesTo() { return this.get('appliesTo') as MgmtFormControl; }

  constructor(service: WSFederationRegisterdService) {
    super({
      realm: new MgmtFormControl(service?.realm),
      appliesTo: new MgmtFormControl(service?.appliesTo)
    });
  }

  mapForm(service: WSFederationRegisterdService) {
    service.realm = this.realm.value;
    service.appliesTo = this.appliesTo.value;
  }
}
