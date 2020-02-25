import {AttributeReleaseForm} from '../../attribute-release.form';
import {MetadataEntityAttributesAttributeReleasePolicy} from 'domain-lib';
import {MgmtFormControl} from '../../../mgmt-formcontrol';

export class MetadataReleaseForm extends AttributeReleaseForm {

  get entityAttribute() { return this.get('entityAttribute') as MgmtFormControl; }
  get entityAttributeFormat() { return this.get('entityAttributeFormat') as MgmtFormControl; }
  get entityAttributeValues() { return this.get('entityAttributeValues') as MgmtFormControl; }

  constructor(policy: MetadataEntityAttributesAttributeReleasePolicy) {
    super(policy);
    this.addControl('entityAttribute', new MgmtFormControl(policy?.entityAttribute));
    this.addControl('entityAttributeFormat', new MgmtFormControl(policy?.entityAttributeFormat));
    this.addControl('entityAttributeValues', new MgmtFormControl(policy?.entityAttributeValues));
  }

  mapForm(policy: MetadataEntityAttributesAttributeReleasePolicy) {
    super.mapForm(policy);
    policy.entityAttributeValues = this.entityAttributeValues.value;
    policy.entityAttributeFormat = this.entityAttributeFormat.value;
    policy.entityAttribute = this.entityAttribute.value;
  }
}
