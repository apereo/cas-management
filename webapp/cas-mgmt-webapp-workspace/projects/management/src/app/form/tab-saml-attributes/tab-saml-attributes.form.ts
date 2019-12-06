import {FormGroup} from '@angular/forms';
import {AttributesForm, MgmtFormGroup} from 'mgmt-lib';
import {AbstractRegisteredService, SamlRegisteredService} from 'domain-lib';

export class TabSamlAttributesForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  get nameFormats() { return this.get('nameFormats') as AttributesForm; }
  get friendlyNames() { return this.get('friendlyNames') as AttributesForm; }
  get valueTypes() { return this.get('valueTypes') as AttributesForm; }

  constructor(service: SamlRegisteredService) {
    super({
      nameFormats: new AttributesForm(service && service.attributeNameFormats),
      friendlyNames: new AttributesForm(service && service.attributeFriendlyNames),
      valueTypes: new AttributesForm(service && service.attributeValueTypes)
    });
  }

  mapForm(service: AbstractRegisteredService) {
    const saml: SamlRegisteredService = service as SamlRegisteredService;
    saml.attributeNameFormats = this.nameFormats.mapFormString();
    saml.attributeFriendlyNames = this.friendlyNames.mapFormString();
    saml.attributeValueTypes = this.valueTypes.mapFormString();
  }

}
