import {FormGroup} from '@angular/forms';
import {
  AbstractRegisteredService,
  AnonymousRegisteredServiceUsernameProvider,
  DefaultRegisteredServiceUsernameProvider,
  MgmtFormControl,
  MgmtFormGroup,
  PrincipalAttributeRegisteredServiceUsernameProvider,
  RegisteredServiceUsernameAttributeProvider,
  UserAttributeType,
  GroovyRegisteredServiceUsernameProvider,
  ScriptedRegisteredServiceUsernameProvider
} from 'mgmt-lib';
import {GroovyAttrForm} from './groovy-attr-form';
import {BaseAttrForm} from './base-attr-form';
import {ScriptAttrForm} from './script-attr-form';
import {AnonAttrForm} from './anon-attr-form';
import {PrincipalAttrForm} from './principal-attr-form';
import {DefaultAttrForm} from './default-attr-form';

export class UsernameattrForm extends FormGroup implements MgmtFormGroup<AbstractRegisteredService> {

  type: MgmtFormControl;
  provider: MgmtFormGroup<RegisteredServiceUsernameAttributeProvider>;

  constructor(public data: RegisteredServiceUsernameAttributeProvider) {
    super({});
    const type = this.findType(data);
    this.type = new MgmtFormControl(type);
    this.provider = this.getProvider(type);
    this.addControl('type', this.type);
    this.addControl('provider', this.provider);
    this.type.valueChanges.subscribe(val => this.changeType(val));
  }

  formMap(): any {
    return {};
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.value;
    if (frm.type === UserAttributeType.DEFAULT) {
      service.usernameAttributeProvider = new DefaultRegisteredServiceUsernameProvider();
    }
    if (frm.type === UserAttributeType.SCRIPTED) {
      service.usernameAttributeProvider = new ScriptedRegisteredServiceUsernameProvider();
    }
    if (frm.type === UserAttributeType.GROOVY) {
      service.usernameAttributeProvider = new GroovyRegisteredServiceUsernameProvider();
    }
    if (frm.type === UserAttributeType.PRINCIPAL_ATTRIBUTE) {
      service.usernameAttributeProvider = new PrincipalAttributeRegisteredServiceUsernameProvider();
    }
    if (frm.type === UserAttributeType.ANONYMOUS) {
      service.usernameAttributeProvider = new AnonymousRegisteredServiceUsernameProvider();
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

  getProvider(type: UserAttributeType): BaseAttrForm<RegisteredServiceUsernameAttributeProvider> {
    if (type === UserAttributeType.GROOVY) {
      return new GroovyAttrForm(this.data as GroovyRegisteredServiceUsernameProvider);
    }
    if (type === UserAttributeType.SCRIPTED) {
      return new ScriptAttrForm(this.data as ScriptedRegisteredServiceUsernameProvider);
    }
    if (type === UserAttributeType.ANONYMOUS) {
      return new AnonAttrForm(this.data as AnonymousRegisteredServiceUsernameProvider);
    }
    if (type === UserAttributeType.PRINCIPAL_ATTRIBUTE) {
      return new PrincipalAttrForm(this.data as PrincipalAttributeRegisteredServiceUsernameProvider);
    }
    if (this.data) {
      return new DefaultAttrForm(this.data as DefaultRegisteredServiceUsernameProvider);
    } else {
      return new DefaultAttrForm(new DefaultRegisteredServiceUsernameProvider());
    }
  }

  changeType(type: UserAttributeType) {
    const base = this.provider as  BaseAttrForm<RegisteredServiceUsernameAttributeProvider>;
    if (type === UserAttributeType.GROOVY) {
      const provider = new GroovyRegisteredServiceUsernameProvider();
      base.baseForm(provider);
      this.provider = new GroovyAttrForm(provider);
    }
    if (type === UserAttributeType.SCRIPTED) {
      const provider = new ScriptedRegisteredServiceUsernameProvider();
      base.baseForm(provider);
      this.provider = new ScriptAttrForm(provider);
    }
    if (type === UserAttributeType.ANONYMOUS) {
      const provider = new AnonymousRegisteredServiceUsernameProvider();
      base.baseForm(provider);
      this.provider = new AnonAttrForm(provider);
    }
    if (type === UserAttributeType.PRINCIPAL_ATTRIBUTE) {
      const provider = new PrincipalAttributeRegisteredServiceUsernameProvider();
      base.baseForm(provider);
      this.provider = new PrincipalAttrForm(provider);
    }
    if (type === UserAttributeType.DEFAULT) {
      const provider = new DefaultRegisteredServiceUsernameProvider();
      base.baseForm(provider);
      this.provider = new DefaultAttrForm(provider);
    }
  }
}
