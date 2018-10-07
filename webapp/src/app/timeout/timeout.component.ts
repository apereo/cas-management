import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {Messages} from '../messages';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.css']
})
export class TimeoutComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeoutComponent>,
              public messages: Messages) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 18000);
  }

}
