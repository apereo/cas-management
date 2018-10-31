import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DiffEntry} from 'mgmt-lib';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {

  acceptMessage: String;
  changes: DiffEntry[];

  constructor(public dialogRef: MatDialogRef<AcceptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DiffEntry[]) { }

  ngOnInit() {
    this.changes = this.data;
  }

}
