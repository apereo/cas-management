import {Component, Input} from '@angular/core';
import {ScriptReleaseForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display Scripted Attribute Release policy.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-script',
  templateUrl: './script.component.html'
})
export class ScriptComponent {

  @Input()
  form: ScriptReleaseForm;

  constructor() {
  }

}
