import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  file: String;
  mode: String;
  theme: String;

  constructor(public dialogRef: MatDialogRef<ViewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: String[]) { }

  ngOnInit() {
    this.mode = this.data[1];
    this.theme = this.data[2];
    setTimeout(() => {
      this.file = this.data[0];
    }, 10);
  }

}
