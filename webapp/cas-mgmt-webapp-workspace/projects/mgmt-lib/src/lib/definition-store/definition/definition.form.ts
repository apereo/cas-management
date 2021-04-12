import {FormGroup, Validators, FormControl} from '@angular/forms';
import {DefaultAttributeDefinition, SamlIdPAttributeDefinition} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Form group for displaying and updating attribute definitions.
 */
export class DefaultDefinitionForm extends FormGroup {

  get key() { return this.get('key') as FormControl; }
  get name() { return this.get('name') as FormControl; }
  get scoped() { return this.get('scoped') as FormControl; }
  get encrypted() { return this.get('encrypted') as FormControl; }
  get attribute() { return this.get('attribute') as FormControl; }
  get patternFormat() { return this.get('patternFormat') as FormControl; }
  get script() { return this.get('script') as FormControl; }

  constructor(definition: DefaultAttributeDefinition) {
    super({
      key: new FormControl(definition?.key, Validators.required),
      name: new FormControl(definition?.name, Validators.required),
      scoped: new FormControl(definition?.scoped),
      encrypted: new FormControl(definition?.encrypted),
      attribute: new FormControl(definition?.attribute),
      patternFormat: new FormControl(definition?.patternFormat),
      script: new FormControl(definition?.script),
    });
  }

  /**
   * Maps form values to a DefaultAttributeDefinition.
   */
  map(): DefaultAttributeDefinition {
    const definition = new DefaultAttributeDefinition();
    this.mapValues(definition);
    return definition;
  }

  /**
   * Maps the form values to the passed definition.
   *
   * @param definition - DefaultAttributeDefinition
   */
  mapValues(definition: DefaultAttributeDefinition) {
    definition.key = this.key.value;
    definition.name = this.name.value;
    definition.scoped = this.scoped.value;
    definition.encrypted = this.encrypted.value;
    definition.attribute = this.attribute.value;
    definition.patternFormat = this.patternFormat.value;
    definition.script = this.script.value;
  }
}

/**
 * Form that extends the default definition and adds fields for SAML.
 */
export class SamlDefinitionForm extends DefaultDefinitionForm {

  get friendlyName() { return this.get('friendlyName') as FormControl; }
  get urn() { return this.get('urn') as FormControl; }

  constructor(definition: SamlIdPAttributeDefinition) {
    super(definition);
    this.addControl('friendlyName', new FormControl(definition?.friendlyName));
    this.addControl('urn', new FormControl(definition?.urn));
  }

  /**
   * Maps the form valiues to SamlIdpAttributeDefinition.
   */
  map(): SamlIdPAttributeDefinition {
    const definition = new SamlIdPAttributeDefinition();
    super.mapValues(definition);
    this.mapValues(definition);
    return definition;
  }

  /**
   * Maps form values to the passed definition.
   *
   * @param definition -
   */
  mapValues(definition: SamlIdPAttributeDefinition) {
    definition.friendlyName = this.friendlyName.value;
    definition.urn = this.urn.value;
  }
}
