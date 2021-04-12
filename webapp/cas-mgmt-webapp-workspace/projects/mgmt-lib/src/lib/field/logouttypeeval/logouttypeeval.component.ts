import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component for displaying/update Logout Type for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-logouttypeeval',
  templateUrl: './logouttypeeval.component.html'
})
export class LogouttypeevalComponent {

  @Input()
  control: FormControl;

  constructor(public config: AppConfigService) {
  }

}
