import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, MgmtFormControl, PublicKeyForm, ExpirationForm} from 'mgmt-lib';
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
      evalOrder: new MgmtFormControl(service && service.evaluationOrder),
      required: new MgmtFormControl(service && service.requiredHandlers),
      environments: new MgmtFormControl(service && service.environments),
      responseType: new MgmtFormControl(service && service.responseType),
      publicKey: new PublicKeyForm(service && service.publicKey),
      expirationPolicy: new ExpirationForm(service && service.expirationPolicy)
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
