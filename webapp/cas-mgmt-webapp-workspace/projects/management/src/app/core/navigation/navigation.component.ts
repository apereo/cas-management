import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AppConfigService, UserService, LibNavigationComponent} from 'shared-lib';
import {ControlsService} from '../../project-share/controls/controls.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild('navcom', { static: true})
  navcom: LibNavigationComponent;

  constructor(public router: Router,
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

  pullRequests(): number {
    return this.controlsService.status && this.controlsService.status.pullRequests;
  }

  submissions(): number {
    return this.controlsService.status && this.controlsService.status.submissions;
  }

  navto(path: string) {
    this.router.navigate([path]);
    this.navcom.close();
  }

}
