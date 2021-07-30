import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  DenyAllAttributeReleasePolicy,
  GroovySamlRegisteredServiceAttributeReleasePolicy,
  GroovyScriptAttributeReleasePolicy,
  InCommonRSAttributeReleasePolicy,
  MetadataEntityAttributesAttributeReleasePolicy,
  PatternMatchingEntityIdAttributeReleasePolicy,
  RegisteredServiceAttributeReleasePolicy,
  ReleasePolicyType,
  ReturnAllAttributeReleasePolicy,
  ReturnAllowedAttributeReleasePolicy,
  ReturnMappedAttributeReleasePolicy,
  ReturnRestfulAttributeReleasePolicy,
  ScriptedRegisteredServiceAttributeReleasePolicy,
  SamlIdpRegisteredServiceAttributeReleasePolicy,
  attributeReleaseFactory,
  ChainingAttributeReleasePolicy
} from '@apereo/mgmt-lib/src/lib/model';
import {
  AllowedReleasedForm,
  ChainingForm,
  GroovyReleaseForm,
  GroovySamlReleaseForm,
  MappedReleaseForm,
  MgmtFormGroup,
  RestfulReleseForm, SamlIdpReleaseForm
} from '@apereo/mgmt-lib/src/lib/form';
import {AllReleaseForm, AttributeReleaseForm, DenyReleaseForm} from '@apereo/mgmt-lib/src/lib/form';
import {ScriptReleaseForm} from '@apereo/mgmt-lib/src/lib/form';
import {MetadataReleaseForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating Attribute Release policies for a service.
 *
 * @author Travis Schmidt
 */
export class TabReleaseForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: FormControl;
  get policy() { return this.get('policy') as AttributeReleaseForm; }
  set policy(p: AttributeReleaseForm) { this.setControl('policy', p); }

  constructor(private releasePolicy: RegisteredServiceAttributeReleasePolicy) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets the form controls.
   */
  reset(): void {
    this.type = new FormControl(this.findType(this.releasePolicy));
    this.policy = this.getPolicy();
    this.type.valueChanges.subscribe(() => this.changeType());
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisteredService
   */
  map(service: AbstractRegisteredService) {
    const type = this.type.value;
    service.attributeReleasePolicy = attributeReleaseFactory(service.attributeReleasePolicy, type);
    this.policy.map(service.attributeReleasePolicy);
  }

  /**
   * Handles changing the type of policy.
   */
  changeType() {
    const type = this.type.value;
    this.releasePolicy = attributeReleaseFactory(this.releasePolicy, type);
    this.policy = this.getPolicy();
    this.policy.markAsTouched();
    this.policy.markAsDirty();
  }

  /**
   * Creates and returns the correct AttributeReleaseForm for the current policy.
   */
  getPolicy(): AttributeReleaseForm {
    const type = this.type.value;
    if (type === ReleasePolicyType.RESTFUL) {
      return new RestfulReleseForm(this.releasePolicy as ReturnRestfulAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.GROOVY_SAML) {
      return new GroovySamlReleaseForm(this.releasePolicy as GroovySamlRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.GROOVY) {
      return new GroovyReleaseForm(this.releasePolicy as GroovyScriptAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.SCRIPT) {
      return new ScriptReleaseForm(this.releasePolicy as ScriptedRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.DENY_ALL) {
      return new DenyReleaseForm(this.releasePolicy as DenyAllAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_MAPPED) {
      return new MappedReleaseForm(this.releasePolicy as ReturnMappedAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.METADATA) {
      return new MetadataReleaseForm(this.releasePolicy as MetadataEntityAttributesAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_ALLOWED) {
      return new AllowedReleasedForm(this.releasePolicy as ReturnAllowedAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.RETURN_ALL) {
      return new AllReleaseForm(this.releasePolicy as ReturnAllAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.SAML_IDP) {
      return new SamlIdpReleaseForm(this.releasePolicy as SamlIdpRegisteredServiceAttributeReleasePolicy);
    }
    if (type === ReleasePolicyType.CHAINING) {
      return new ChainingForm(this.releasePolicy as ChainingAttributeReleasePolicy);
    }
  }

  /**
   * Determines and returns the corresponding type value for the current policy.
   *
   * @param policy - attribute release policy
   */
  findType(policy: RegisteredServiceAttributeReleasePolicy): ReleasePolicyType {
    if (ReturnAllAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.RETURN_ALL;
    }
    if (DenyAllAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.DENY_ALL;
    }
    if (ReturnMappedAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.RETURN_MAPPED;
    }
    if (ReturnAllowedAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.RETURN_ALLOWED;
    }
    if (ScriptedRegisteredServiceAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.SCRIPT;
    }
    if (GroovyScriptAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.GROOVY;
    }
    if (InCommonRSAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.INCOMMON;
    }
    if (PatternMatchingEntityIdAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.MATCHING;
    }
    if (MetadataEntityAttributesAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.METADATA;
    }
    if (ReturnRestfulAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.RESTFUL;
    }
    if (GroovySamlRegisteredServiceAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.GROOVY_SAML;
    }
    if (SamlIdpRegisteredServiceAttributeReleasePolicy.instanceOf(policy)) {
      return ReleasePolicyType.SAML_IDP;
    }
    return ReleasePolicyType.DENY_ALL;
  }
}

