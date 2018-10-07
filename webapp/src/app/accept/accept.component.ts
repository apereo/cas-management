import {Component, OnInit, Inject} from '@angular/core';
import {Messages} from '../messages';
import {DiffEntry} from '../../domain/diff-entry';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {

  acceptMessage: String;
  changes: DiffEntry[];

  constructor(public dialogRef: MatDialogRef<AcceptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DiffEntry[],
              public messages: Messages) { }

  ngOnInit() {
    this.changes = this.data;
  }

}
