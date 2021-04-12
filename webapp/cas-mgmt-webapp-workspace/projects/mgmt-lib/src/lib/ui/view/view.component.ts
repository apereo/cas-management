import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Component to display ACE editor in a dialog.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-view',
  templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {

  file: string;
  mode: string;
  theme: string;

  constructor(public dialogRef: MatDialogRef<ViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string[]) { }

  /**
   * Starts the component by setting the data from the calling component.
   */
  ngOnInit() {
    this.mode = this.data[1];
    this.theme = this.data[2];
    setTimeout(() => {
      this.file = this.data[0];
    }, 10);
  }

}
