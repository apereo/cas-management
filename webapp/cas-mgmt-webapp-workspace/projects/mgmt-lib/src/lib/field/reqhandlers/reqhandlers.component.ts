import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

/**
 * Component to display/update Required Handlers.
 */
@Component({
  selector: 'lib-reqhandlers',
  templateUrl: './reqhandlers.component.html'
})
export class RequiredHandlersComponent {

  @Input()
  control: FormControl;

  constructor() {
  }

}
