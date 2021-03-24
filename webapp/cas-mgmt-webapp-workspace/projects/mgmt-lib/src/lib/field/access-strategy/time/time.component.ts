import {Component, Input} from '@angular/core';
import {TimeForm} from '@apereo/mgmt-lib/src/lib/form';

/**
 * Component to display options for Time Access Strategy options.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-time',
  templateUrl: './time.component.html'
})
export class TimeComponent {

  @Input()
  form: TimeForm;

  constructor() {
  }

}
