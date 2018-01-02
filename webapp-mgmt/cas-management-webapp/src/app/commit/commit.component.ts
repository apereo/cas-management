import {Component, OnInit, Input, Inject} from '@angular/core';
import {Messages} from '../messages';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DiffEntry} from '../../domain/diff-entry';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit {

  commitMessage: String;
  changes: DiffEntry[];
  isAdmin: boolean;

  constructor(public dialogRef: MatDialogRef<CommitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [any],
              public messages: Messages) { }

  ngOnInit() {
    this.changes = this.data[0];
    this.isAdmin = this.data[1];
  }

}
