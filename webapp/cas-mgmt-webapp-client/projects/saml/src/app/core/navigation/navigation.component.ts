import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Location} from '@angular/common';
import {AppConfigService, UserService, SpinnerService} from 'mgmt-lib';
import {AddComponent} from '../../project-share/add/add.component';

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
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public spinner: SpinnerService) { }

    logout() {
        window.location.href = '../logout.html';
    }

    getUser(): string {
        return this.userService.user ? this.userService.user.firstName : '';
    }

    add() {
      const dialogRef = this.dialog.open(AddComponent, {
        width: '500px',
        position: {top: '100px'}
      });
      dialogRef.afterClosed().subscribe(resp => {
          if (resp === 'upload') {
            this.router.navigate(['form', 0]);
          }
        }
      );
    }
}
