import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {ControlsService} from './controls/controls.service';
import {TimeoutComponent} from './timeout/timeout.component';

@Component({
  selector: 'mgmt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog,
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
