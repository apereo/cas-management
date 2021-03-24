import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Components used to display/update environments the service is available in.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-environments',
  templateUrl: './environments.component.html'
})
export class EnvironmentsComponent {

  @Input()
  control: FormControl;

}
