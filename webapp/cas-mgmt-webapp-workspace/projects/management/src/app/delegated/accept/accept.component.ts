import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {DiffEntry} from 'domain-lib';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html'
})
export class AcceptComponent implements OnInit {

  acceptMessage: string;
  changes: DiffEntry[];

  constructor(public dialogRef: MatDialogRef<AcceptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DiffEntry[]) { }

  ngOnInit() {
    this.changes = this.data;
  }

}
