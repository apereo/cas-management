import {FormGroup} from '@angular/forms';
import {AbstractRegisteredService, SamlRegisteredService} from '@apereo/mgmt-lib/src/lib/model';
import {MgmtFormGroup, AttributesForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating saml attribute options for a service.
 *
 * @author Travis Schmidt
 */
export class TabSamlAttributesForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get nameFormats() { return this.get('nameFormats') as AttributesForm; }
  set nameFormats(c: AttributesForm) { this.setControl('nameFormats', c); }
  get friendlyNames() { return this.get('friendlyNames') as AttributesForm; }
  set friendlyNames(c: AttributesForm) { this.setControl('friendlyNames', c); }
  get valueTypes() { return this.get('valueTypes') as AttributesForm; }
  set valueTypes(c: AttributesForm) { this.setControl('valueTypes', c); }

  constructor(private service: SamlRegisteredService) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.nameFormats = new AttributesForm(this.service?.attributeNameFormats);
    this.friendlyNames = new AttributesForm(this.service?.attributeFriendlyNames);
    this.valueTypes = new AttributesForm(this.service?.attributeValueTypes);
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    const saml: SamlRegisteredService = service as SamlRegisteredService;
    saml.attributeNameFormats = this.nameFormats.mapString() || new Map();
    saml.attributeFriendlyNames = this.friendlyNames.mapString() || new Map();
    saml.attributeValueTypes = this.valueTypes.mapString()|| new Map();
  }
  
}
