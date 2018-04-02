import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ControlsService} from '../../app/controls/controls.service';
import {Messages} from '../../app/messages';

@Component({
  selector: 'register-submit',
  templateUrl: './submit.component.html'
})

export class SubmitComponent implements OnInit {

  change: boolean;

  constructor(public dialogRef: MatDialogRef<SubmitComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean,
              public messages: Messages,
              public controlsService: ControlsService) { }

  ngOnInit() {
    this.change = this.data;
  }

}