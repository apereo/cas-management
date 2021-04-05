import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component to display submission instructions to user.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-register-submit',
  templateUrl: './submit.component.html'
})

export class SubmitComponent implements OnInit {

  type: string;
  msg: string;

  constructor(public dialogRef: MatDialogRef<SubmitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string[]) { }

  /**
   * Sets data passed from calling component.
   */
  ngOnInit() {
    this.type = this.data[0];
    this.msg = this.data[1];
  }

}
