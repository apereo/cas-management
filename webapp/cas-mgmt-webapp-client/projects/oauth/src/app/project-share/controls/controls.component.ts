import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AppConfigService} from 'mgmt-lib';
import {Location} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html'
})

export class ControlsComponent implements OnInit {

  @Input()
  saveDisabled = true;

  @Input()
  showBack = true;

  @Input()
  showEdit = false;

  @Input()
  showRefresh = false;

  @Output()
  save: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(public appService: AppConfigService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public location: Location) {
  }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}

