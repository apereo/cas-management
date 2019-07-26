import {Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html'
})
export class RejectComponent implements OnInit {

  rejectMessage: string;

  constructor(public dialogRef: MatDialogRef<RejectComponent>) { }

  ngOnInit() {
  }

}
