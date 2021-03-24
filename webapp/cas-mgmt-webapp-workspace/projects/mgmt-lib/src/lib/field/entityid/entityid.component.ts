import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component used to display/update enitity ids for saml services.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-entityid',
  templateUrl: './entityid.component.html'
})
export class EntityIdComponent {

  @Input()
  control: FormControl;

  @Input()
  serviceType: FormControl;

}
