import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Dialog component to ask user if they want to stay logged in.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-timeout',
  templateUrl: './timeout.component.html'
})
export class TimeoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeoutComponent>) { }

  /**
   * Starts the component by setting a timer to display the dialog.
   */
  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 18000);
  }

}
