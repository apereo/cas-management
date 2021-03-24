import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update logo url for the service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-logo',
  templateUrl: './logo.component.html'
})
export class LogoComponent {

  @Input()
  control: FormControl;

}
