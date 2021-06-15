import {Component, Input} from '@angular/core';
import {AuthenticationPolicyForm} from "@apereo/mgmt-lib/src/lib/form";

@Component({
  selector: 'lib-authn-policy',
  templateUrl: './authn-policy.component.html',
  styleUrls: ['./authn-policy.component.css']
})
export class AuthenticationPolicyComponent {

  @Input()
  form: AuthenticationPolicyForm;

}
