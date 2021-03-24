import {Component, Input} from '@angular/core';
import {AccessStrategyForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display options for Required Attributes Access Strategy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-required',
  templateUrl: './required.component.html'
})
export class RequiredComponent {

  @Input()
  form: AccessStrategyForm;

  constructor(public config: AppConfigService) {
  }

}
