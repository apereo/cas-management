import {Component, Input} from '@angular/core';
import {IdTokenForm} from '@apereo/mgmt-lib/src/lib/form';
import {AppConfigService} from '@apereo/mgmt-lib/src/lib/ui';

/**
 * Component to display/update algorithm options for Id Tokens.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-idtoken',
  templateUrl: './idtoken.component.html',
  styleUrls: ['./idtoken.component.css']
})
export class IdtokenComponent {

  @Input()
  form: IdTokenForm;

  constructor(public config: AppConfigService) { }

}
