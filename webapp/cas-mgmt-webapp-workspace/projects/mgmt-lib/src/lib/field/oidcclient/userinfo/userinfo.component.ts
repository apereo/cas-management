import {Component, Input} from '@angular/core';
import {UserinfoForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update option for user info.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent {
  @Input()
  form: UserinfoForm;

  constructor(public config: AppConfigService) { }

}
