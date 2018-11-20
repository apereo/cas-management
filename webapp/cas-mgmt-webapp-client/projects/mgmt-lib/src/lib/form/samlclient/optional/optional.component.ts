import {Component, forwardRef, OnInit} from '@angular/core';
import {SamlRegisteredService} from '../../../domain/saml-service';
import {DataRecord} from '../../data';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {HasControls} from '../../has-controls';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lib-optional',
  templateUrl: './optional.component.html',
  styleUrls: ['./optional.component.css'],
  providers: [{
    provide: HasControls,
    useExisting: forwardRef(() => SamlOptionalComponent)
  }]
})
export class SamlOptionalComponent extends HasControls implements OnInit {

  service: SamlRegisteredService;
  original: SamlRegisteredService;

  skipGeneratingAssertionNameId: MgmtFormControl;
  skipGeneratingSubjectConfirmationInResponseTo: MgmtFormControl;
  skipGeneratingSubjectConfirmationNotOnOrAfter: MgmtFormControl;
  skipGeneratingSubjectConfirmationRecipient: MgmtFormControl;
  skipGeneratingSubjectConfirmationNotBefore: MgmtFormControl;

  constructor(public data: DataRecord) {
    super();
    this.service = data.service as SamlRegisteredService;
    this.original = data.original && data.original as SamlRegisteredService;
  }

  getControls(): Map<string, FormControl> {
    let c: Map<string, FormControl> = new Map();
    c.set('skipGeneratingAssertionNameId', this.skipGeneratingAssertionNameId);
    c.set('skipGeneratingSubjectConfirmationInResponseTo', this.skipGeneratingSubjectConfirmationInResponseTo);
    c.set('skipGeneratingSubjectConfirmationNotOnOrAfter', this.skipGeneratingSubjectConfirmationNotOnOrAfter);
    c.set('skipGeneratingSubjectConfirmationRecipient', this.skipGeneratingSubjectConfirmationRecipient);
    c.set('skipGeneratingSubjectConfirmationNotBefore', this.skipGeneratingSubjectConfirmationNotBefore);
    return c;
  }

  ngOnInit() {
    const og: any = this.original ? this.original : {};
    this.skipGeneratingAssertionNameId = new MgmtFormControl(this.service.skipGeneratingAssertionNameId, og.skipGeneratingAssertionNameId);
    this.skipGeneratingSubjectConfirmationInResponseTo = new MgmtFormControl(this.service.skipGeneratingSubjectConfirmationInResponseTo,
      og.skipGeneratingSubjectConfirmationInResponseTo);
    this.skipGeneratingSubjectConfirmationNotOnOrAfter = new MgmtFormControl(this.service.skipGeneratingSubjectConfirmationNotOnOrAfter,
      og.skipGeneratingSubjectConfirmationNotOnOrAfter);
    this.skipGeneratingSubjectConfirmationRecipient = new MgmtFormControl(this.service.skipGeneratingSubjectConfirmationRecipient,
      og.skipGeneratingSubjectConfirmationRecipient);
    this.skipGeneratingSubjectConfirmationNotBefore = new MgmtFormControl(this.service.skipGeneratingSubjectConfirmationNotBefore,
      og.skipGeneratingSubjectConfirmationNotBefore);
  }

}
