import {FormGroup} from '@angular/forms';
import {AnonymousUidForm, GroovyUidForm, MgmtFormControl, MgmtFormGroup, PrincipalUidForm, ScriptUidForm, UidattrsForm} from 'mgmt-lib';
import {
    AbstractRegisteredService,
    AnonymousRegisteredServiceUsernameProvider,
    DefaultRegisteredServiceUsernameProvider,
    GroovyRegisteredServiceUsernameProvider,
    PrincipalAttributeRegisteredServiceUsernameProvider,
    RegisteredServiceUsernameAttributeProvider,
    ScriptedRegisteredServiceUsernameProvider,
    UserAttributeType,
    usernameProviderFactory
} from 'domain-lib';

export class TabUsernameattrForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: MgmtFormControl;
  get provider() { return this.get('provider') as UidattrsForm; }
  set provider(p: UidattrsForm) { this.setControl('provider', p); }

  constructor(public usernameAttributeProvider: RegisteredServiceUsernameAttributeProvider) {
    super({});
    this.type = new MgmtFormControl(this.findType(usernameAttributeProvider));
    this.provider = this.getProvider();
    this.type.valueChanges.subscribe(() => this.changeType());
  }

  mapForm(service: AbstractRegisteredService) {
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
    this.provider.mapForm(service.usernameAttributeProvider);
  }

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
        if (this.usernameAttributeProvider) {
          return new UidattrsForm(this.usernameAttributeProvider as DefaultRegisteredServiceUsernameProvider);
        } else {
          return new UidattrsForm(new DefaultRegisteredServiceUsernameProvider());
        }
    }
  }

  changeType() {
    const type = this.type.value;
    this.usernameAttributeProvider = usernameProviderFactory(null, type);
    this.provider = this.getProvider();
    this.provider.markAsTouched();
    this.provider.markAsDirty();
  }
}
