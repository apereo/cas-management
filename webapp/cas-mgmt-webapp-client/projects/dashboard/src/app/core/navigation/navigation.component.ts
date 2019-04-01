import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {AppConfigService, UserService} from 'mgmt-lib';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 799px)'])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public router: Router,
              public location: Location,
              public appService: AppConfigService,
              public userService: UserService,
              public snackBar: MatSnackBar) { }

    logout() {
        window.location.href = '../logout.html';
    }

    getUser(): string {
        return this.userService.user ? this.userService.user.firstName : '';
    }
}
