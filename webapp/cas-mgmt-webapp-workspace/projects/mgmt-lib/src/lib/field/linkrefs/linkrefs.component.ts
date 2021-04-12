import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to dsiplay reference links for the service.
 */
@Component({
  selector: 'lib-linkrefs',
  templateUrl: './linkrefs.component.html'
})
export class LinkrefsComponent {

  @Input()
  control: FormControl;

}
