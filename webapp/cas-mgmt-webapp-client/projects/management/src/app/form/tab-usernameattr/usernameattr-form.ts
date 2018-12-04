import {FormGroup, Validators} from '@angular/forms';
import {
  MgmtFormGroup,
  DataRecord,
  MgmtFormControl,
  AnonymousRegisteredServiceUsernameProvider,
  DefaultRegisteredServiceUsernameProvider,
  PrincipalAttributeRegisteredServiceUsernameProvider,
  RegisteredServiceUsernameAttributeProvider,
  UserAttributeType,
  AbstractRegisteredService
} from 'mgmt-lib';

export class UsernameattrForm extends MgmtFormGroup {

  constructor(public data: DataRecord) {
    super();
    this.form = new FormGroup({
      type: new MgmtFormControl(null),
      anonymous: new FormGroup({
        salt: new MgmtFormControl(null),
        attribute: new MgmtFormControl(null)
      }),
      principal: new FormGroup({
        usernameAttribute: new MgmtFormControl(null, null, Validators.required),
        encryptUserName: new MgmtFormControl(null),
        canonicalizationMode: new MgmtFormControl(null)
      })
    });
    this.form.setValue(this.formMap());
  }

  formMap(): any {
    const provider: RegisteredServiceUsernameAttributeProvider = this.data.service.usernameAttributeProvider;
    const type = this.type(provider);
    return {
      type: this.type(provider),
      anonymous: {
        salt: type === UserAttributeType.ANONYMOUS ? (<AnonymousRegisteredServiceUsernameProvider>provider).persistentIdGenerator.salt : null,
        attribute: type === UserAttributeType.ANONYMOUS ? (<AnonymousRegisteredServiceUsernameProvider>provider).persistentIdGenerator.attribute : null
      },
      principal: {
        usernameAttribute: type === UserAttributeType.PRINCIPAL_ATTRIBUTE ? (<PrincipalAttributeRegisteredServiceUsernameProvider>provider).usernameAttribute : null,
        encryptUserName: type === UserAttributeType.PRINCIPAL_ATTRIBUTE ? (<PrincipalAttributeRegisteredServiceUsernameProvider>provider).encryptUserName : null,
        canonicalizationMode: type === UserAttributeType.PRINCIPAL_ATTRIBUTE ? (<PrincipalAttributeRegisteredServiceUsernameProvider>provider).canonicalizationMode : null
      }
    };
  }

  mapForm(service: AbstractRegisteredService) {
    const frm = this.form.value;
    service.usernameAttributeProvider = new DefaultRegisteredServiceUsernameProvider(service.usernameAttributeProvider);
    if (frm.type === UserAttributeType.ANONYMOUS) {
      service.usernameAttributeProvider = new AnonymousRegisteredServiceUsernameProvider();
      (<AnonymousRegisteredServiceUsernameProvider>service.usernameAttributeProvider).persistentIdGenerator.salt = frm.anonymous.salt;
      (<AnonymousRegisteredServiceUsernameProvider>service.usernameAttributeProvider).persistentIdGenerator.attribute = frm.anonymous.attribute;
    }
    if (frm.type === UserAttributeType.PRINCIPAL_ATTRIBUTE) {
      service.usernameAttributeProvider = new PrincipalAttributeRegisteredServiceUsernameProvider(service.usernameAttributeProvider);
      (<PrincipalAttributeRegisteredServiceUsernameProvider>service.usernameAttributeProvider).usernameAttribute = frm.principal.usernameAttribute;
      (<PrincipalAttributeRegisteredServiceUsernameProvider>service.usernameAttributeProvider).encryptUserName = frm.principal.encryptUserName;
      (<PrincipalAttributeRegisteredServiceUsernameProvider>service.usernameAttributeProvider).canonicalizationMode = frm.principal.canonicalizationMode;
    }
  }

  type(provider: RegisteredServiceUsernameAttributeProvider): UserAttributeType {
    if (AnonymousRegisteredServiceUsernameProvider.instanceOf(provider)) {
      return UserAttributeType.ANONYMOUS;
    } else if (PrincipalAttributeRegisteredServiceUsernameProvider.instanceOf(provider)) {
      return UserAttributeType.PRINCIPAL_ATTRIBUTE;
    }
    return UserAttributeType.DEFAULT;
  }
}
