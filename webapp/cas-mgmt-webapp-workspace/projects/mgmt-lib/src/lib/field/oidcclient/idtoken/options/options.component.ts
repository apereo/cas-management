import {Component, Input} from '@angular/core';
import {OptionsForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update options related to OIDC Id Tokens.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {

  @Input()
  form: OptionsForm;

  constructor() { }

}
