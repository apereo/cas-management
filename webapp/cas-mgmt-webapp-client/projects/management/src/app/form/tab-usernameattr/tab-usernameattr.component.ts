import {Component} from '@angular/core';
import {DataRecord} from 'mgmt-lib';
import {UsernameattrForm} from './usernameattr-form';

@Component({
  selector: 'app-tab-usernameattr',
  templateUrl: './tab-usernameattr.component.html'
})
export class TabUsernameattrComponent {

  uidAttrs: UsernameattrForm;

  constructor(public data: DataRecord) {
    if (this.data.formMap.has('uidAttrs')) {
      this.uidAttrs = this.data.formMap.get('uidAttrs') as UsernameattrForm;
      return;
    }
    this.uidAttrs = new UsernameattrForm(this.data);
    /*
    this.uidAttrs.get('type').valueChanges.subscribe(val => {
      if (val === UserAttributeType.PRINCIPAL_ATTRIBUTE) {
        this.setPrincipal(this.uidAttrs.get('principal') as FormGroup, new PrincipalAttributeRegisteredServiceUsernameProvider());
      } else if (val === UserAttributeType.ANONYMOUS) {
        this.setAnon(this.uidAttrs.get('anonymous') as FormGroup, new AnonymousRegisteredServiceUsernameProvider());
      }
    });
    */
    this.data.formMap.set('uidAttrs', this.uidAttrs);
  }

  /*
  setAnon(anon: FormGroup, provider: AnonymousRegisteredServiceUsernameProvider) {
    anon.get('salt').setValue(provider.persistentIdGenerator.salt);
    anon.get('attribute').setValue(provider.persistentIdGenerator.attribute);
  }

  setPrincipal(principal: FormGroup, provider: PrincipalAttributeRegisteredServiceUsernameProvider) {
    principal.get('usernameAttribute').setValue(provider.usernameAttribute);
    principal.get('encryptUserName').setValue(provider.encryptUserName);
    principal.get('canonicalizationMode').setValue(provider.canonicalizationMode);
  }
  */
}
