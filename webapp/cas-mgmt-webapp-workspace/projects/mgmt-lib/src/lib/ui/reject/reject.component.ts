import {Component} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Component to reject a user submission for a service and provide a reason for rejecting it.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-reject',
  templateUrl: './reject.component.html'
})
export class RejectComponent {

  rejectMessage: string;

  constructor(public dialogRef: MatDialogRef<RejectComponent>) { }

}
