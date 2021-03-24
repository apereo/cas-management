import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update the description of service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-servicedesc',
  templateUrl: './servicedesc.component.html'
})
export class ServicedescComponent {

  @Input()
  control: FormControl;

}
