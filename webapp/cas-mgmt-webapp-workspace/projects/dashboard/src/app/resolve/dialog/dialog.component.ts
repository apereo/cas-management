import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {DialogForm} from './dialog.form';

/**
 * Dialog component for user to enter credentials for resolving attributes.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  form = new DialogForm();

  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }

  /**
   * Gets values form ui and passes back to calling component.
   */
  resolve() {
    const data = {
      username: this.form.username.value,
    };
    this.dialogRef.close(data);
  }

}
