import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update Theme id for a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-themeid',
  templateUrl: './themeid.component.html'
})
export class ThemeidComponent {

  @Input()
  control: FormControl;

}
