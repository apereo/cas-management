import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css']
})
export class RejectComponent implements OnInit {

  rejectMessage: String;

  constructor(public dialogRef: MatDialogRef<RejectComponent>) { }

  ngOnInit() {
  }

}
