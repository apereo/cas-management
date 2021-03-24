import {FormControl, FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  AnonymousRegisteredServiceUsernameProvider,
  DefaultRegisteredServiceUsernameProvider,
  PrincipalAttributeRegisteredServiceUsernameProvider,
  RegisteredServiceUsernameAttributeProvider,
  UserAttributeType,
  GroovyRegisteredServiceUsernameProvider,
  ScriptedRegisteredServiceUsernameProvider, usernameProviderFactory
} from '@apereo/mgmt-lib/src/lib/model';
import {
  AnonymousUidForm,
  GroovyUidForm,
  MgmtFormGroup,
  PrincipalUidForm,
  ScriptUidForm,
  UidattrsForm
} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Top level form group for displaying and updating username attribute options for a service.
 *
 * @author Travis Schmidt
 */
export class TabUsernameattrForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: FormControl;
  get provider() { return this.get('provider') as UidattrsForm; }
  set provider(p: UidattrsForm) { this.setControl('provider', p); }

  constructor(private usernameAttributeProvider: RegisteredServiceUsernameAttributeProvider) {
    super({});
    this.reset();
  }

  /**
   * Creates or resets controls in the form.
   */
  reset(): void {
    this.type = new FormControl(this.findType(this.usernameAttributeProvider));
    this.provider = this.getProvider();
    this.type.valueChanges.subscribe(() => this.changeType());
  }

  /**
   * Maps the form values to the passed service.
   *
   * @param service - AbstractRegisterdService
   */
  map(service: AbstractRegisteredService) {
    switch (this.type.value) {
      case UserAttributeType.SCRIPTED:
        service.usernameAttributeProvider = new ScriptedRegisteredServiceUsernameProvider();
        break;
      case UserAttributeType.GROOVY:
        service.usernameAttributeProvider = new GroovyRegisteredServiceUsernameProvider();
        break;
      case UserAttributeType.PRINCIPAL_ATTRIBUTE:
        service.usernameAttributeProvider = new PrincipalAttributeRegisteredServiceUsernameProvider();
        break;
      case UserAttributeType.ANONYMOUS:
        service.usernameAttributeProvider = new AnonymousRegisteredServiceUsernameProvider();
        break;
      default:
        service.usernameAttributeProvider = new DefaultRegisteredServiceUsernameProvider();
    }
    this.provider.map(service.usernameAttributeProvider);
  }

  /**
   * Determines the provider type for the corresponding passed provider.
   *
   * @param provider - RegisteredServiceUsernameAttributeProvider
   */
  findType(provider: RegisteredServiceUsernameAttributeProvider): UserAttributeType {
    if (AnonymousRegisteredServiceUsernameProvider.instanceOf(provider)) {
      return UserAttributeType.ANONYMOUS;
    }
    if (PrincipalAttributeRegisteredServiceUsernameProvider.instanceOf(provider)) {
      return UserAttributeType.PRINCIPAL_ATTRIBUTE;
    }
    if (ScriptedRegisteredServiceUsernameProvider.instanceOf(provider)) {
      return UserAttributeType.SCRIPTED;
    }
    if (GroovyRegisteredServiceUsernameProvider.instanceOf(provider)) {
      return UserAttributeType.GROOVY;
    }
    return UserAttributeType.DEFAULT;
  }

  /**
   * Creates and returns the UidattrsForm for the current provider.
   */
  getProvider(): UidattrsForm {
    switch (this.type.value) {
      case UserAttributeType.GROOVY:
        return new GroovyUidForm(this.usernameAttributeProvider as GroovyRegisteredServiceUsernameProvider);
      case UserAttributeType.SCRIPTED:
        return new ScriptUidForm(this.usernameAttributeProvider as ScriptedRegisteredServiceUsernameProvider);
      case UserAttributeType.ANONYMOUS:
        return new AnonymousUidForm(this.usernameAttributeProvider as AnonymousRegisteredServiceUsernameProvider);
      case UserAttributeType.PRINCIPAL_ATTRIBUTE:
        return new PrincipalUidForm(this.usernameAttributeProvider as PrincipalAttributeRegisteredServiceUsernameProvider);
      default:
        if (!this.usernameAttributeProvider) {
          this.usernameAttributeProvider = new DefaultRegisteredServiceUsernameProvider();
        }
        return new UidattrsForm(this.usernameAttributeProvider as DefaultRegisteredServiceUsernameProvider);
    }
  }

  /**
   * Handles changing the type of provider.
   */
  changeType() {
    const type = this.type.value;
    this.usernameAttributeProvider = usernameProviderFactory(this.usernameAttributeProvider, type);
    this.provider = this.getProvider();
    this.provider.markAsTouched();
    this.provider.markAsDirty();
  }
}
