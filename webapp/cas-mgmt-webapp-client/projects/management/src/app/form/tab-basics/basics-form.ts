import {FormGroup, Validators} from '@angular/forms';
import {MgmtFormGroup, DataRecord, MgmtFormControl, AbstractRegisteredService} from 'mgmt-lib';

export class BasicsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(private data: DataRecord) {
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
      enabled: this.data.service.accessStrategy.enabled,
      serviceId: this.data.service.serviceId,
      serviceName: this.data.service.name,
      description: this.data.service.description,
      theme: this.data.service.theme,
      logo: this.data.service.logo,
      informationUrl: this.data.service.informationUrl,
      privacyUrl: this.data.service.privacyUrl,
      serviceType: this.data.service['@class']
    }
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
