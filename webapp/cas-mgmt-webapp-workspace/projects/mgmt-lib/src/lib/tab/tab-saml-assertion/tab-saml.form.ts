import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, NameidForm, OptionalForm, AssertionForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating Saml Assertion options for a service.
 *
 * @author Travis Schmidt
 */
export class TabSamlAssertionForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get nameId() { return this.get('nameId') as NameidForm; }
  set nameId(c: NameidForm) { this.setControl('nameId', c); }
  get optional() { return this.get('optional') as OptionalForm; }
  set optional(c: OptionalForm) { this.setControl('optional', c); }
  get assertion() { return this.get('assertion') as AssertionForm; }
  set assertion(c: AssertionForm) { this.setControl('assertion', c); }

  constructor(private service: SamlRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets the controls in the form.
   */
  reset(): void {
    this.nameId = new NameidForm(this.service);
    this.optional = new OptionalForm(this.service);
    this.assertion = new AssertionForm(this.service);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    this.nameId.map(service as SamlRegisteredService);
    this.optional.map(service as SamlRegisteredService);
    this.assertion.map(service as SamlRegisteredService);
  }
}
