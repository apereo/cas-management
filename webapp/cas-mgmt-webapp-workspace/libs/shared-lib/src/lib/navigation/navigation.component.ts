import {Component, ViewChild} from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatSidenav} from '@angular/material';
import {UserService} from '../user.service';

@Component({
  selector: 'lib-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class LibNavigationComponent {

  @ViewChild(MatSidenav, { static: true })
   drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(['(max-width: 799px)'])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService) {
  }

  getUser(): string {
    return this.userService.user ? this.userService.user.firstName : '';
  }

  badge(): boolean {
    return false;
  }

  close() {
    if (this.drawer.mode === 'over') {
      this.drawer.close();
    }
  }
}
