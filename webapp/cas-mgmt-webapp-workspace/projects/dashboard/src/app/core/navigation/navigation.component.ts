import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {LibNavigationComponent} from 'shared-lib';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @ViewChild('navcom', {static: true})
  navcom: LibNavigationComponent;

  constructor(public router: Router) { }

  logout() {
    window.location.href = '../logout.html';
  }

  navto(path: string) {
    this.router.navigate([path]);
    this.navcom.close();
  }



}
