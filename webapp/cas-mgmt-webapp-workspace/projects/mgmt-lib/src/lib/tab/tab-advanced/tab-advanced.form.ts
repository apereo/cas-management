import {FormControl, FormGroup} from '@angular/forms';
import {AbstractRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, ExpirationForm, PublicKeyForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating advanced options for a service.
 *
 * @author Travis Schmidt
 */
export class TabAdvancedForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  static readonly EVAL_ORDER = '0';

  static readonly ENVIRONMENTS = '2';
  static readonly RESPONSE_TYPE = '3';
  static readonly PUBLIC_KEY = '4';
  static readonly EXPIRATION_POLICY = '5';

  get evalOrder() { return this.get(TabAdvancedForm.EVAL_ORDER) as FormControl; }
  set evalOrder(c: FormControl) { this.setControl(TabAdvancedForm.EVAL_ORDER, c); }
  get environments() { return this.get(TabAdvancedForm.ENVIRONMENTS) as FormControl; }
  set environments(c: FormControl) { this.setControl(TabAdvancedForm.ENVIRONMENTS, c); }
  get responseType() { return this.get(TabAdvancedForm.RESPONSE_TYPE) as FormControl; }
  set responseType(c: FormControl) { this.setControl(TabAdvancedForm.RESPONSE_TYPE, c); }
  get publicKey() { return this.get(TabAdvancedForm.PUBLIC_KEY) as PublicKeyForm; }
  set publicKey(c: PublicKeyForm) { this.setControl(TabAdvancedForm.PUBLIC_KEY, c); }
  get expirationPolicy() { return this.get(TabAdvancedForm.EXPIRATION_POLICY) as ExpirationForm; }
  set expirationPolicy(c: ExpirationForm) { this.setControl(TabAdvancedForm.EXPIRATION_POLICY, c); }

  constructor(public service: AbstractRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Sets the from during construction or resets the forms.
   */
  reset(): void {
    this.evalOrder = new FormControl(this.service?.evaluationOrder);
    this.environments = new FormControl(this.service?.environments);
    this.responseType = new FormControl(this.service?.responseType);
    this.publicKey = new PublicKeyForm(this.service?.publicKey);
    this.expirationPolicy = new ExpirationForm(this.service?.expirationPolicy);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    service.evaluationOrder = this.evalOrder.value;
    service.environments = this.environments.value && this.environments.value.length > 0 ? this.environments.value.split(',') : null;
    service.responseType = this.responseType.value;
    service.publicKey = this.publicKey.map();
    service.expirationPolicy = this.expirationPolicy.map();
  }
}
