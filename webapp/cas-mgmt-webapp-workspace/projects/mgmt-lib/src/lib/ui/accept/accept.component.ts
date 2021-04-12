import {Component, OnInit, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {DiffEntry} from '@apereo/mgmt-lib/src/lib/model';

/**
 * Dialog component that displays changes to accept.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-accept',
  templateUrl: './accept.component.html'
})
export class AcceptComponent implements OnInit {

  acceptMessage: string;
  changes: DiffEntry[];

  constructor(public dialogRef: MatDialogRef<AcceptComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DiffEntry[]) { }

  /**
   * Starts component by setting changes form injected data.
   */
  ngOnInit() {
    this.changes = this.data;
  }

}
