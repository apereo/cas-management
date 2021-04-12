import {Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

/**
 * Component to display a progress bar and message for long running requests to server.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }

}
