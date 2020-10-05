import {Component, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {AppConfigService, LibNavigationComponent, UserService} from 'shared-lib';
import {ControlsService} from '../../project-share/controls/controls.service';
import {OAuthAddComponent, SamlAddComponent} from 'mgmt-lib';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { FormDataService } from 'mgmt-lib';

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
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public formData: FormDataService) {
    router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        this.current = e.url;
      }
    });

    // console.log(formData.options.serviceTypes);
  }

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

  isSaml(): boolean {
    return this.appService.config.samlEnabled;
  }

  isOauth(): boolean {
    return this.appService.config.oauthEnabled;
  }

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

  createSamlService() {
    const dialogRef = this.dialog.open(SamlAddComponent, {
      position: {top: '100px'}
    });
    dialogRef.afterClosed().subscribe(resp => {
        if (resp === 'upload') {
          this.router.navigate(['form/saml']);
        }
      }
    );
  }

  createOAuthService() {
    if (this.canCreateOauthServices && this.canCreateOidcServices) {
      const dialogRef = this.dialog.open(OAuthAddComponent, {
        width: '500px',
        position: { top: '100px' }
      });
      dialogRef.afterClosed().subscribe(type => {
        if (type) {
          this.router.navigate(['form/' + type]);
        }
      });
    } else {
      const type = this.canCreateOauthServices ? 'oauth' : 'oidc';
      this.router.navigate(['form/' + type]);
    }
  }

  optionsHasServiceType(type: string): boolean {
    return this.formData.options?.serviceTypes?.some(t => t.value.match(type));
  }

  get canCreateCasServices(): boolean {
    return this.optionsHasServiceType('RegexRegisteredService');
  }

  get canCreateSamlServices(): boolean {
    return this.optionsHasServiceType('SamlRegisteredService');
  }

  get canCreateOauthServices(): boolean {
    return this.optionsHasServiceType('OAuthRegisteredService');
  }

  get canCreateOidcServices(): boolean {
    return this.optionsHasServiceType('OidcRegisteredService');
  }
}
