import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-timeout',
  templateUrl: './timeout.component.html'
})
export class TimeoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeoutComponent>) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 18000);
  }

}
