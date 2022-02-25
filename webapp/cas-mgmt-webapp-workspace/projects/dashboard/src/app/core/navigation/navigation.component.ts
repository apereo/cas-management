import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LibNavigationComponent, UserService} from '@apereo/mgmt-lib';

/**
 * Component for navigation and main router outlet for the app.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild('navcom', {static: true})
  navcom: LibNavigationComponent;

  isAdmin = false;

  managementUrl:string = `${this.baseUrl.replace('/dashboard', '/management')}`

  constructor(public router: Router, private user: UserService) {
    this.user.getUser().subscribe(usr => {
      this.isAdmin = usr.administrator;
    });
  }

  get baseUrl(): string {
    const url = new URL(document.getElementsByTagName('base')[0].href);
    return url.pathname;
  }

  /**
   * Logs the user out of the app.
   */
  logout() {
    window.location.href = '../logout.html';
  }

  /**
   * Navigates the main router outlet to the passes path.
   *
   * @param path - path to route to
   */
  navto(path: string) {
    this.router.navigate([path]).then();
    this.navcom.close();
  }

}
