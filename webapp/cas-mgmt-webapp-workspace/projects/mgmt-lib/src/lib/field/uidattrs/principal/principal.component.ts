import {Component, Input} from '@angular/core';
import {PrincipalUidForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update Principal UID attributes.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-principal',
  templateUrl: './principal.component.html'
})
export class PrincipalComponent {

  @Input()
  form: PrincipalUidForm;

  constructor(public config: AppConfigService) {
  }

}
