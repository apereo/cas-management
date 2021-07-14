import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to enable/disable acceptable usage policy in a service.
 *
 * @author Ryan Mathis
 */
@Component({
  selector: 'lib-aup-enabled',
  templateUrl: './aup-enabled.component.html'
})
export class AcceptableUsagePolicyEnabledComponent {

  @Input()
  control: FormControl;

}
