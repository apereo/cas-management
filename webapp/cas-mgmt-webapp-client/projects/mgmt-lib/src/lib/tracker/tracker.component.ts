import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {TimeoutComponent} from '../timeout/timeout.component';
import {ServiceInterceptor} from '../interceptor';

@Component({
  selector: 'lib-tracker',
  template: ''
})
export class TrackerComponent implements OnInit {
  timer;

  @Input()
  minutes = 30;

  time: number;

  timerHandler = () => {
    this.dialog.open(TimeoutComponent, {
      width: '500px',
      position: { top: '100px'}
    }).afterClosed().subscribe((result) => {
      if (result) {
        window.location.href = '../logout.html';
      } else {
        this.setTimer();
      }
    });
  }

  constructor(public dialog: MatDialog,
              private router: Router,
              private serviceInterceptor: ServiceInterceptor) {
  }

  ngOnInit() {
    this.time = this.minutes * 60 * 1000;
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.setTimer());
    this.serviceInterceptor.call.subscribe(() => this.setTimer());
    this.setTimer();
  }

  setTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.timerHandler, this.time);
  }

}
