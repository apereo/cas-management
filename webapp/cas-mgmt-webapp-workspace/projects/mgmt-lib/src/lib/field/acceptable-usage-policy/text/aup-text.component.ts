import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update the text of an Acceptable Usage Policy.
 *
 * @author Ryan Mathis
 */
@Component({
  selector: 'lib-aup-text',
  templateUrl: './aup-text.component.html'
})
export class AcceptableUsagePolicyTextComponent {

  @Input()
  control: FormControl;

}
