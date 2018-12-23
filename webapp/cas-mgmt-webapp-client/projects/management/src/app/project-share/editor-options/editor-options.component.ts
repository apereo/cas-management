import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-editor-options',
  templateUrl: './editor-options.component.html'
})
export class EditorOptionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditorOptionsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
