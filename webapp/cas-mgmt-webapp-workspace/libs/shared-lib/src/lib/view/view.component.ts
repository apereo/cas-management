import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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

  ngOnInit() {
    this.mode = this.data[1];
    this.theme = this.data[2];
    setTimeout(() => {
      this.file = this.data[0];
    }, 10);
  }

}
