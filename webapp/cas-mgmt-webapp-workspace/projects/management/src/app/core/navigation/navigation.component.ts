import {Component, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {AppConfigService, UserService, LibNavigationComponent, ControlsService} from '@apereo/mgmt-lib';

/**
 * Component to display main router and side navigation for application.
 *
 * @author Travis Schmidt.
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild('navcom', { static: true})
  navcom: LibNavigationComponent;

  current: string;

  constructor(public router: Router,
              public appService: AppConfigService,
              public userService: UserService,
              public controlsService: ControlsService,
              public snackBar: MatSnackBar) {
    router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        this.current = e.url;
      }
    });
  }

  /**
   * Logs the user out the application.
   */
  logout() {
    window.location.href = '../logout.html';
  }

  /**
   * Returns true if the logged in user is an admin.
   */
  isAdmin(): boolean {
    return this.userService.user && this.userService.user.administrator;
  }

  /**
   * Returns true if the app is configured with a sync script.
   */
  isSyncScript(): boolean {
    return this.appService.config.syncScript;
  }

  /**
   * Returns true if the app is configures with delagation.
   */
  isDelegated(): boolean {
    return this.appService.config.delegatedMgmt;
  }

  /**
   * Returns true if the app is configured with version control.
   */
  isVersionControl(): boolean {
    return this.appService.config.versionControl;
  }

  /**
   * Calls the server to sync the management registry to CAS servers using the sync script.
   */
  sync() {
    this.controlsService.sync().subscribe(() =>  this.appService.showSnackBar('Services Synchronized'));
  }

  /**
   * Returns the number of open pull requests.
   */
  pullRequests(): number {
    return this.controlsService.status && this.controlsService.status.pullRequests;
  }

  /**
   * Returns the number of open submissions by users.
   */
  submissions(): number {
    return this.controlsService.status && this.controlsService.status.submissions;
  }

  /**
   * Navigates the main router to the passed path.
   *
   * @param path - path to a component in the router
   */
  navto(path: string) {
    this.router.navigate([path]).then();
    this.navcom.close();
  }

  /**
   * Returns true if SAML authentication is configured.
   */
  isSaml(): boolean {
    return this.appService.config.samlEnabled;
  }

  /**
   * Returns true if OAuth authentication is configured.
   */
  isOauth(): boolean {
    return this.appService.config.oauthEnabled;
  }

  /**
   * Returns the style to be applied to a nav item based on if that router is currently displaying that item.
   *
   * @param rte - route paths a nav item represents
   */
  isSelected(rte: string[]): string {
    let style = '';
    if (this.current) {
      rte.forEach(r => {
        if (this.current.includes(r)) {
          style = 'selected';
        }
      });
    }
    return style;
  }
}
