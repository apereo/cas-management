import {Component, Input} from '@angular/core';
import {AttributesForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update WS Federation Attribute release policies.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-wsfedattrrelpolicies',
  templateUrl: './wsfedattrrelpolicies.component.html',
  styleUrls: ['./wsfedattrrelpolicies.component.css']
})
export class WsfedattrrelpoliciesComponent {

  @Input()
  control: AttributesForm;

  constructor(public config: AppConfigService) {
  }

}
