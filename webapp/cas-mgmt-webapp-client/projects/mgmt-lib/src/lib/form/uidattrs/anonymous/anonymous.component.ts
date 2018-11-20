import {Component, forwardRef, OnInit} from '@angular/core';
import {AnonymousRegisteredServiceUsernameProvider} from '../../../domain/attribute-provider';
import {FormData} from '../../../domain/form-data';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => AnonymousComponent)
  }]
})
export class AnonymousComponent extends HasControls implements OnInit {

  provider: AnonymousRegisteredServiceUsernameProvider;
  original: AnonymousRegisteredServiceUsernameProvider;
  formData: FormData;
  salt: MgmtFormControl;
  attribute: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.provider = data.service.usernameAttributeProvider as AnonymousRegisteredServiceUsernameProvider;
    this.formData = data.formData;
    this.original = data.original && data.original.usernameAttributeProvider as AnonymousRegisteredServiceUsernameProvider;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('salt', this.salt);
    c.set('attribute', this.attribute);
    return c;
  }

  ngOnInit() {
    const og: any = this.original && this.original.persistentIdGenerator ? this.original.persistentIdGenerator : {};
    const pr: any = this.provider && this.provider.persistentIdGenerator ? this.provider.persistentIdGenerator : {};
    this.salt = new MgmtFormControl(pr.salt, og.salt)
    this.attribute = new MgmtFormControl(pr.attribute, og.attribute);
  }

}
