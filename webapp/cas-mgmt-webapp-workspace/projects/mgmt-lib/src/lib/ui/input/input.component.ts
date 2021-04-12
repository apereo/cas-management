import {Component, Input} from '@angular/core';

/**
 * Component to wrap Material FormFields to apply formatting and common logic.
 *
 * @author Travis schmidt
 */
@Component({
  selector: 'lib-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input()
  toolTip;

  constructor() {}

}
