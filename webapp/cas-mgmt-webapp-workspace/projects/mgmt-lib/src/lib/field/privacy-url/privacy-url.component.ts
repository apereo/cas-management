import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update the Privacy URL.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-privacy-url',
  templateUrl: './privacy-url.component.html'
})
export class PrivacyUrlComponent {

  @Input()
  control: FormControl;

}
