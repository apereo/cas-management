import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-revert',
  templateUrl: './revert.component.html',
  styleUrls: ['./revert.component.css']
})
export class RevertComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RevertComponent>) { }

  ngOnInit() {
  }

}
