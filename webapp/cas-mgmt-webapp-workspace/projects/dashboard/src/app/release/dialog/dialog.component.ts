import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Dialog component for user to enter credentials for resolving attributes.
 *
 * @author Travis Scchmidt
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(private dialogRef: MatDialogRef<DialogComponent>) { }

  /**
   * Gets values form ui and passes back to calling component.
   *
   * @param uid - user id
   * @param password - user password
   * @param serviceId - service id
   */
  resolve(uid: string, password: string, serviceId: string) {
    const data = {username: uid, password, service: serviceId};
    this.dialogRef.close(data);
  }

}
