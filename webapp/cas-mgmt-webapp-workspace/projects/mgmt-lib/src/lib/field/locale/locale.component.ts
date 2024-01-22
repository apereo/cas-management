import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update locale for a service.
 *
 * @author Martin Buechler
 */
@Component({
  selector: 'lib-locale',
  templateUrl: './locale.component.html'
})
export class LocaleComponent {

  @Input()
  control: FormControl;

}
