import {Component, OnInit} from '@angular/core';
import {Messages} from './messages';
import {MatDialog} from '@angular/material';
import {TimeoutComponent} from './timeout/timeout.component';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {ControlsService} from './controls/controls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {

  constructor(public messages: Messages,
              public dialog: MatDialog,
              public controlService: ControlsService,
              private router: Router) {
  }

  ngOnInit() {
    this.setSessionTimer();
    this.controlService.callStatus();
  }

  setSessionTimer() {
    setTimeout(() => {
      this.dialog.open(TimeoutComponent, {
        width: '500px',
        position: { top: '100px'}
      }).afterClosed().subscribe((result) => {
        if (result) {
          window.location.href = 'logout.html';
        } else {
          this.setSessionTimer();
        }
      })
    }, (30 * 60 * 1000));
  }

}


