import {Component, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import {MediaObserver} from '@angular/flex-layout';
import {OAuthAddComponent, SamlAddComponent, UserService} from '@apereo/mgmt-lib/src';
import {ControlsService} from '../../project-share/controls/controls.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

/**
 * Component to set up application frame for navigation and main router to display.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild(MatSidenav, { static: true })
   drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.mediaObserver.asObservable()
    .pipe(
      map(() => this.mediaObserver.isActive('lt-md'))
    );

  constructor(private mediaObserver: MediaObserver,
              private userService: UserService,
              private router: Router,
              private dialog: MatDialog,
              public controls: ControlsService) {
  }

  /**
   * Extracts the user name from the service.
   */
  getUser(): string {
    return this.userService.user ? this.userService.user.firstName : '';
  }

  /**
   * If badge should be displayed.
   */
  badge(): boolean {
    return false;
  }

  /**
   * Closes the sidenav on smaller screens if it is opened.
   */
  close() {
    if (this.drawer.mode === 'over') {
      this.drawer.close().then();
    }
  }

  /**
   * Logs out of the application.
   */
  logout() {
    window.location.href = '../logout.html';
  }

  /**
   * Navigates to the passed route.
   *
   * @param path - path to component in router
   */
  navto(path: string) {
    this.router.navigate([path]).then();
  }

  /**
   * Opens the dialog for user to uplod SP metadata for new SAML service.
   */
  addSaml() {
    this.dialog.open(SamlAddComponent, {
      position: {top: '100px'},
      data: {showNew: false}
    }).afterClosed().subscribe(resp => {
      if (resp === 'upload') {
        this.router.navigate(['form/saml']).then();
      }
    });
  }

  /**
   * Opens dialog for user to choose type of OAuth integration.
   */
  addOauth() {
    this.dialog.open(OAuthAddComponent, {
      width: '500px',
      position: {top: '100px'}
    }).afterClosed().subscribe(type => {
      if (type) {
        this.router.navigate(['form/' + type]).then();
      }
    });
  }
}
