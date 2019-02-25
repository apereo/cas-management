import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-optional',
  templateUrl: './optional.component.html'
})
export class SamlOptionalComponent implements OnInit {

  @Input()
  control: FormGroup;
  skipGeneratingAssertionNameId: MgmtFormControl;
  skipGeneratingSubjectConfirmationInResponseTo: MgmtFormControl;
  skipGeneratingSubjectConfirmationNotOnOrAfter: MgmtFormControl;
  skipGeneratingSubjectConfirmationRecipient: MgmtFormControl;
  skipGeneratingSubjectConfirmationNotBefore: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
    this.skipGeneratingAssertionNameId = this.control.get('skipGeneratingAssertionNameId') as MgmtFormControl;
    this.skipGeneratingSubjectConfirmationInResponseTo =
      this.control.get('skipGeneratingSubjectConfirmationInResponseTo') as MgmtFormControl;
    this.skipGeneratingSubjectConfirmationNotOnOrAfter =
      this.control.get('skipGeneratingSubjectConfirmationNotOnOrAfter') as MgmtFormControl;
    this.skipGeneratingSubjectConfirmationRecipient = this.control.get('skipGeneratingSubjectConfirmationRecipient') as MgmtFormControl;
    this.skipGeneratingSubjectConfirmationNotBefore = this.control.get('skipGeneratingSubjectConfirmationNotBefore') as MgmtFormControl;
  }

}
