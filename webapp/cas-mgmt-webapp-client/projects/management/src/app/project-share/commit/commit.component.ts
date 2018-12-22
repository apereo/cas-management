import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GitStatus} from 'mgmt-lib';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit {

  commitMessage: string;
  status: GitStatus;
  isAdmin: boolean;

  constructor(public dialogRef: MatDialogRef<CommitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [any, boolean]) { }

  ngOnInit() {
    this.status = this.data[0];
    this.isAdmin = this.data[1];
  }

}
