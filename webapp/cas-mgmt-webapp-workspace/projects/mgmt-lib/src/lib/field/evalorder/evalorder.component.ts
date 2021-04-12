import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update evaluation order of the service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-evalorder',
  templateUrl: './evalorder.component.html'
})
export class EvalorderComponent {

  @Input()
  control: FormControl;

}
