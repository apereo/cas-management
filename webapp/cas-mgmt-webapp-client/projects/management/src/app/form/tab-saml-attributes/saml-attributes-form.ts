import {FormGroup} from '@angular/forms';
import {
  MgmtFormGroup,
  AbstractRegisteredService,
  SamlRegisteredService
} from 'mgmt-lib';
import {AttributeForm} from '@app/form/attribute-form';

export class SamlAttributesForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  constructor(public service: SamlRegisteredService) {
    super({
      nameFormats: new AttributeForm(service.attributeNameFormats),
      friendlyNames: new AttributeForm(service.attributeFriendlyNames),
      valueTypes: new AttributeForm(service.attributeValueTypes)
    });
    this.setValue(this.formMap());
  }

  formMap(): any {
    return {
      nameFormats: (<AttributeForm>this.get('nameFormats')).formMap(),
      friendlyNames: (<AttributeForm>this.get('friendlyNames')).formMap(),
      valueTypes: (<AttributeForm>this.get('valueTypes')).formMap()
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const saml: SamlRegisteredService = service as SamlRegisteredService;
    saml.attributeNameFormats = (<AttributeForm>this.get('nameFormats')).mapFormString();
    saml.attributeFriendlyNames = (<AttributeForm>this.get('friendlyName')).mapFormString();
    saml.attributeValueTypes = (<AttributeForm>this.get('valueTypes')).mapFormString();
  }

}
