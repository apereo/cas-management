import {FormGroup} from '@angular/forms';
import {MgmtFormGroup, NameidForm, OptionalForm, AssertionForm} from 'mgmt-lib';
import {AbstractRegisteredService, SamlRegisteredService} from 'domain-lib';

export class TabSamlAssertionForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get nameId() { return this.get('nameId') as NameidForm; }
  get optional() { return this.get('optional') as OptionalForm; }
  get assertion() { return this.get('assertion') as AssertionForm; }

  constructor(service: SamlRegisteredService) {
    super({
      nameId: new NameidForm(service),
      optional: new OptionalForm(service),
      assertion: new AssertionForm(service)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    this.nameId.mapForm(service as SamlRegisteredService);
    this.optional.mapForm(service as SamlRegisteredService);
    this.assertion.mapForm(service as SamlRegisteredService);
  }
}
