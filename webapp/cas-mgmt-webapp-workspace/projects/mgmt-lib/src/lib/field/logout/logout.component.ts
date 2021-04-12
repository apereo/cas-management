import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update logout url for the service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent {

  @Input()
  control: FormControl;

}
