import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update allowed response type by the service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-responsetype',
  templateUrl: './responsetype.component.html'
})
export class ResponsetypeComponent {

  @Input()
  control: FormControl;

}
