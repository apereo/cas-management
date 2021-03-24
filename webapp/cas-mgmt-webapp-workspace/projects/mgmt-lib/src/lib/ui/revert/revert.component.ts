import {Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Dialog component to confirm reverting changes in the repository.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-revert',
  templateUrl: './revert.component.html'
})
export class RevertComponent {

  constructor(public dialogRef: MatDialogRef<RevertComponent>) { }

}
