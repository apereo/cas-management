import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating basic options for a service.
 *
 * @author Travis Schmidt
 */
export class TabBasicsForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get serviceEnabled() { return this.get('enabled') as FormControl; }
  get serviceId() { return this.get('serviceId') as FormControl; }
  get serviceName() { return this.get('serviceName') as FormControl; }
  get description() { return this.get('description') as FormControl; }
  get theme() { return this.get('theme') as FormControl; }
  get locale() { return this.get('locale') as FormControl; }
  get logo() { return this.get('logo') as FormControl; }
  get informationUrl() { return this.get('informationUrl') as FormControl; }
  get privacyUrl() { return this.get('privacyUrl') as FormControl; }
  get serviceType() { return this.get('serviceType') as FormControl; }

  constructor(private service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * creates or resets the controls in the form.
   */
  reset(): void {
    this.setControl('enabled', new FormControl(this.service?.accessStrategy?.enabled));
    this.setControl('serviceId', new FormControl(this.service?.serviceId, Validators.required));
    this.setControl('serviceName', new FormControl(this.service?.name, Validators.required));
    this.setControl('description', new FormControl(this.service?.description));
    this.setControl('theme', new FormControl(this.service?.theme));
    this.setControl('locale', new FormControl(this.service?.locale));
    this.setControl('logo', new FormControl(this.service?.logo));
    this.setControl('informationUrl', new FormControl(this.service?.informationUrl));
    this.setControl('privacyUrl', new FormControl(this.service?.privacyUrl));
    this.setControl('serviceType', new FormControl(this.service?.['@class']));
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    service.accessStrategy.enabled = this.serviceEnabled.value;
    service.serviceId = this.serviceId.value;
    service.name = this.serviceName.value;
    service.description = this.description.value;
    service.theme = this.theme.value;
    service.locale = this.locale.value;
    service.logo = this.logo.value;
    service.informationUrl = this.informationUrl.value;
    service.privacyUrl = this.privacyUrl.value;
  }
}
