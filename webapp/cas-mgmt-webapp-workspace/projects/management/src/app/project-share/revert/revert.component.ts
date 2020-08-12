import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-revert',
  templateUrl: './revert.component.html'
})
export class RevertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RevertComponent>) { }

  ngOnInit() {
  }

}
