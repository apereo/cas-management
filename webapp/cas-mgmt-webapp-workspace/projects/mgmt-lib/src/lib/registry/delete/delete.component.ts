import {Component, Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component to confirm deletion of a service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

}
