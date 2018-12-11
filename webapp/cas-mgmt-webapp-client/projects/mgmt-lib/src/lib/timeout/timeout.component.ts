import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'lib-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.css']
})
export class TimeoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeoutComponent>) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 18000);
  }

}
