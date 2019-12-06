import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LibNavigationComponent, UserService} from 'shared-lib';

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

  logout() {
    window.location.href = '../logout.html';
  }

  navto(path: string) {
    this.router.navigate([path]);
    this.navcom.close();
  }

}
