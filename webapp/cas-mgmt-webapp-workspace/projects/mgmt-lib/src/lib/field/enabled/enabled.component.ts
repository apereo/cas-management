import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to enable/disable a service in the registry.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-enabled',
  templateUrl: './enabled.component.html'
})
export class EnabledComponent {

  @Input()
  control: FormControl;

}
