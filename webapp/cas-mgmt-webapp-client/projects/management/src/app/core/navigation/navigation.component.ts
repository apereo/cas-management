import {Component, ViewChild} from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatDialog, MatSidenav, MatSnackBar} from '@angular/material';
import {AppConfigService, UserService} from 'mgmt-lib';
import {Location} from '@angular/common';
import {ControlsService} from '../../project-share/controls/controls.service';
import {AddComponent} from '@app/project-share/add/add.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild(MatSidenav, {static: true})
   drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 799px)'])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public router: Router,
              public location: Location,
              public appService: AppConfigService,
              public userService: UserService,
              public controlsService: ControlsService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  logout() {
    window.location.href = '../logout.html';
  }

  isAdmin(): boolean {
    return this.userService.user && this.userService.user.administrator;
  }

  isSyncScript(): boolean {
    return this.appService.config.syncScript;
  }

  isDelegated(): boolean {
    return this.appService.config.delegatedMgmt;
  }

  isVersionControl(): boolean {
    return this.appService.config.versionControl;
  }

  sync() {
    this.controlsService.sync().subscribe(resp => {
      this.snackBar.open('Services Synchronized', 'Dismiss', {
        duration: 5000
      });
    });
  }

  getUser(): string {
    return this.userService.user ? this.userService.user.firstName : '';
  }

  pullRequests(): number {
    return this.controlsService.status && this.controlsService.status.pullRequests;
  }

  submissions(): number {
    return this.controlsService.status && this.controlsService.status.submissions;
  }

  addSaml() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(resp => {
        if (resp === 'upload') {
          this.router.navigate(['form/saml']);
        }
      }
    );
  }

  close() {
    if (this.drawer.mode === 'over') {
      this.drawer.close();
    }
  }

  isSaml(): boolean {
    return this.appService.config.samlEnabled;
  }

  isOauth(): boolean {
    return this.appService.config.oauthEnabled;
  }
}
