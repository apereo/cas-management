import {Component, Input} from '@angular/core';
import {BaseDateTimeSsoForm, SsoPolicyForm} from '@apereo/mgmt-lib/src/lib/form';
import {SsoPolicyType} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Component to display/update SSO policy for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-sso-policy',
  templateUrl: './sso-policy.component.html',
  styleUrls: ['./sso-policy.component.css']
})
export class SsoPolicyComponent {

  @Input()
  form: SsoPolicyForm;

  TYPE = SsoPolicyType;

  /**
   * Cast the form to BaseDateTimeSsoForm.
   */
  timePolicy(): BaseDateTimeSsoForm {
    return this.form as BaseDateTimeSsoForm;
  }

}
