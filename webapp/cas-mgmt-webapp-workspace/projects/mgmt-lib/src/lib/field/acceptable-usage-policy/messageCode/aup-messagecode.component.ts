import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update service name in a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-aup-messagecode',
  templateUrl: './aup-messagecode.component.html'
})
export class AcceptableUsagePolicyMessageCode {

  @Input()
  control: FormControl;

}
