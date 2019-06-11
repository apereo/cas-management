import {FormGroup, Validators} from '@angular/forms';
import {MgmtFormGroup, MgmtFormControl, AbstractRegisteredService} from 'mgmt-lib';

export class BasicsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(private service: AbstractRegisteredService) {
    super({
      enabled: new MgmtFormControl(null),
      serviceId: new MgmtFormControl(null, null, Validators.required),
      serviceName: new MgmtFormControl(null, null, Validators.required),
      description: new MgmtFormControl(null),
      theme: new MgmtFormControl(null),
      logo: new MgmtFormControl(null),
      informationUrl: new MgmtFormControl(null),
      privacyUrl: new MgmtFormControl(null),
      serviceType: new MgmtFormControl(null)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      enabled: this.service.accessStrategy.enabled,
      serviceId: this.service.serviceId,
      serviceName: this.service.name,
      description: this.service.description,
      theme: this.service.theme,
      logo: this.service.logo,
      informationUrl: this.service.informationUrl,
      privacyUrl: this.service.privacyUrl,
      serviceType: this.service['@class']
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.value;
    service.accessStrategy.enabled = frm.enabled;
    service.serviceId = frm.serviceId;
    service.name = frm.serviceName;
    service.description = frm.description;
    service.theme = frm.theme;
    service.logo = frm.logo;
    service.informationUrl = frm.informationUrl;
    service.privacyUrl = frm.privacyUrl;
  }
}
