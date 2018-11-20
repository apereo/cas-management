import {Component, forwardRef, OnInit} from '@angular/core';
import {PrincipalAttributeRegisteredServiceUsernameProvider} from '../../../domain/attribute-provider';
import {FormData} from '../../../domain/form-data';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => PrincipalComponent)
  }]
})
export class PrincipalComponent extends HasControls implements OnInit {

  provider: PrincipalAttributeRegisteredServiceUsernameProvider;
  original: PrincipalAttributeRegisteredServiceUsernameProvider;
  formData: FormData;
  usernameAttribute: MgmtFormControl;
  encryptUserName: MgmtFormControl;
  canonicalizationMode: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.provider = data.service.usernameAttributeProvider as PrincipalAttributeRegisteredServiceUsernameProvider;
    this.original = data.original &&
                    data.original.usernameAttributeProvider as PrincipalAttributeRegisteredServiceUsernameProvider;
    this.formData = data.formData;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('usernameAttribute', this.usernameAttribute);
    c.set('encryptUserName', this.encryptUserName);
    c.set('canonicalizationMode', this.canonicalizationMode);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.usernameAttribute = new MgmtFormControl(this.provider.usernameAttribute, og.usernameAttribute);
    this.encryptUserName = new MgmtFormControl(this.provider.encryptUserName, og.encryptUserName);
    this.canonicalizationMode = new MgmtFormControl(this.provider.canonicalizationMode, og.canonicalizationMode);
  }

}
