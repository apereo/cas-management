import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, WsfedclientForm} from 'mgmt-lib';
import {WSFederationRegisterdService, AbstractRegisteredService} from 'domain-lib';

export class TabWsfedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get wsfed() { return this.get('wsfed') as TabWsfedForm; }

  constructor(service: WSFederationRegisterdService) {
    super({
      wsfed: new WsfedclientForm(service)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    this.wsfed.mapForm(service);
  }
}
