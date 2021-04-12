import {Component, Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to let user confirm deleting service.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html'
})
export class DeleteComponent {

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

}
