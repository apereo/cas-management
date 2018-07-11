import {Component, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSidenav, MatSnackBar} from '@angular/material';
import {Messages} from '../messages';
import {UserService} from '../user.service';
import {AppConfigService} from '../app-config.service';
import {Location} from '@angular/common';
import {ControlsService} from '../controls/controls.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild(MatSidenav)
   drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 799px)'])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public messages: Messages,
              public router: Router,
              public location: Location,
              public appService: AppConfigService,
              public userService: UserService,
              public controlsService: ControlsService,
              public snackBar: MatSnackBar) { }

    doSearch(val: string) {

    }

    logout() {
        window.location.href = 'logout.html';
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

    getUser(): String {
        return this.userService.user ? this.userService.user.firstName : '';
    }

    pullRequests(): number {
        return this.controlsService.status ? this.controlsService.status.pullRequests : 0;
    }

    close() {
      if (this.drawer.mode === 'over') {
        this.drawer.close();
      }
    }
}
