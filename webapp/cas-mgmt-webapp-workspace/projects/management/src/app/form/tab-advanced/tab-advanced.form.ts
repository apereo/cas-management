import {FormGroup} from '@angular/forms';
import {ExpirationForm, MgmtFormControl, MgmtFormGroup, PublicKeyForm} from 'mgmt-lib';
import {AbstractRegisteredService} from 'domain-lib';

export class TabAdvancedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get evalOrder() { return this.get('evalOrder') as MgmtFormControl; }
  get required() { return this.get('required') as MgmtFormControl; }
  get environments() { return this.get('environments') as MgmtFormControl; }
  get responseType() { return this.get('responseType') as MgmtFormControl; }
  get publicKey() { return this.get('publicKey') as PublicKeyForm; }
  get expirationPolicy() { return this.get('expirationPolicy') as ExpirationForm; }

  constructor(public service: AbstractRegisteredService) {
    super({
      evalOrder: new MgmtFormControl(service?.evaluationOrder),
      required: new MgmtFormControl(service?.requiredHandlers),
      environments: new MgmtFormControl(service?.environments),
      responseType: new MgmtFormControl(service?.responseType),
      publicKey: new PublicKeyForm(service?.publicKey),
      expirationPolicy: new ExpirationForm(service?.expirationPolicy)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    service.evaluationOrder = this.evalOrder.value;
    service.requiredHandlers = this.required && this.required.value.length > 0 ? this.required.value.split(',') : null;
    service.environments = this.environments && this.environments.value.length > 0 ? this.environments.value.split(',') : null;
    service.responseType = this.responseType.value;
    service.publicKey = this.publicKey.mapForm();
    service.expirationPolicy = this.expirationPolicy.mapForm();
  }
}
