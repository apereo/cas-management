import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-diff-view',
  templateUrl: './diff-view.component.html',
  styleUrls: ['./diff-view.component.css']
})
export class DiffViewComponent implements OnInit {

  file: String;
  mode: String;
  theme: String;

  constructor(public dialogRef: MatDialogRef<DiffViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: String[]) { }

  ngOnInit() {
    this.mode = this.data[1];
    this.theme = this.data[2];
    setTimeout(() => {
      this.file = this.data[0];
    }, 10);
  }

}
