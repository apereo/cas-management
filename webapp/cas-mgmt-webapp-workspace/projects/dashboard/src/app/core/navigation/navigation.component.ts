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

  constructor(public router: Router, private user: UserService) {
    this.user.getUser().subscribe(usr => {
      this.isAdmin = usr.administrator;
    });
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
