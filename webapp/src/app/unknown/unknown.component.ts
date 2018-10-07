import { Component, OnInit } from '@angular/core';
import {Messages} from '../messages';
import {MatDialogRef} from '@angular/material';
import {TimeoutComponent} from '../timeout/timeout.component';

@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
  styleUrls: ['./unknown.component.css']
})
export class UnknownComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeoutComponent>,
              public messages: Messages) { }

  ngOnInit() {
  }

}
