import {Component, Input} from '@angular/core';
import {ScriptUidForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display/update Sript uid attribute.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-script',
  templateUrl: './script.component.html'
})
export class ScriptComponent {

  @Input()
  form: ScriptUidForm;

}
