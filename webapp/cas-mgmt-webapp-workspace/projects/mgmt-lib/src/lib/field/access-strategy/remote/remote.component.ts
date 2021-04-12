import {Component, Input} from '@angular/core';
import {RemoteForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display Remote Endpoint Access strategy options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-remote',
  templateUrl: './remote.component.html'
})
export class RemoteComponent {

  @Input()
  form: RemoteForm;

  constructor(public config: AppConfigService) {
  }

}
