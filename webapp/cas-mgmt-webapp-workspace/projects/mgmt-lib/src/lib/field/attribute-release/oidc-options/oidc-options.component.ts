import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component for display OIDC options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-oidc-options',
  templateUrl: './oidc-options.component.html'
})
export class OidcOptionsComponent {

  @Input()
  isOidc: boolean;

  @Input()
  isWsFed: boolean;

  @Input()
  control: FormControl;

  @Input()
  scopes: any[];

  constructor(public config: AppConfigService) {}

}
