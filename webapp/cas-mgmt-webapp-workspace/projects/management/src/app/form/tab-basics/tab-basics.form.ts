import {FormGroup, Validators} from '@angular/forms';
import {MgmtFormControl, MgmtFormGroup} from 'mgmt-lib';
import {AbstractRegisteredService} from 'domain-lib';

export class TabBasicsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get serviceEnabled() { return this.get('enabled') as MgmtFormControl; }
  get serviceId() { return this.get('serviceId') as MgmtFormControl; }
  get serviceName() { return this.get('serviceName') as MgmtFormControl; }
  get description() { return this.get('description') as MgmtFormControl; }
  get theme() { return this.get('theme') as MgmtFormControl; }
  get logo() { return this.get('logo') as MgmtFormControl; }
  get informationUrl() { return this.get('informationUrl') as MgmtFormControl; }
  get privacyUrl() { return this.get('privacyUrl') as MgmtFormControl; }
  get serviceType() { return this.get('serviceType') as MgmtFormControl; }

  constructor(service: AbstractRegisteredService) {
    super({
      enabled: new MgmtFormControl(service?.accessStrategy?.enabled),
      serviceId: new MgmtFormControl(service?.serviceId, null, Validators.required),
      serviceName: new MgmtFormControl(service?.name, null, Validators.required),
      description: new MgmtFormControl(service?.description),
      theme: new MgmtFormControl(service?.theme),
      logo: new MgmtFormControl(service?.logo),
      informationUrl: new MgmtFormControl(service?.informationUrl),
      privacyUrl: new MgmtFormControl(service?.privacyUrl),
      serviceType: new MgmtFormControl(service?.['@class'])
    });
  }

  mapForm(service: AbstractRegisteredService) {
    service.accessStrategy.enabled = this.serviceEnabled.value;
    service.serviceId = this.serviceId.value;
    service.name = this.serviceName.value;
    service.description = this.description.value;
    service.theme = this.theme.value;
    service.logo = this.logo.value;
    service.informationUrl = this.informationUrl.value;
    service.privacyUrl = this.privacyUrl.value;
  }
}
