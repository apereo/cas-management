import {Component, Input} from '@angular/core';
import {GrouperForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display Grouper Access Strategy options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-grouper',
  templateUrl: './grouper.component.html'
})
export class GrouperComponent {

  @Input()
  form: GrouperForm;

  constructor(public config: AppConfigService) {}

}
