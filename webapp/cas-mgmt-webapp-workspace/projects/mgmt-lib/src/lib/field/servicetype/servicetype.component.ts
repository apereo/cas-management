import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update type of a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-servicetype',
  templateUrl: './servicetype.component.html'
})
export class ServicetypeComponent {

  @Input()
  control: FormControl;

  constructor(public config: AppConfigService) {
  }

}
