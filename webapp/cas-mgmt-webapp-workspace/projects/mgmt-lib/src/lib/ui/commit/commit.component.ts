import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {GitStatus} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Dialog Component that allows an admin to commit changes and add commit message.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-commit',
  templateUrl: './commit.component.html'
})
export class CommitComponent implements OnInit {

  commitMessage: string;
  status: GitStatus;
  isAdmin: boolean;

  constructor(public dialogRef: MatDialogRef<CommitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [any, boolean]) { }

  /**
   * Starts the component by accessing flags passed.
   */
  ngOnInit() {
    this.status = this.data[0];
    this.isAdmin = this.data[1];
  }

}
