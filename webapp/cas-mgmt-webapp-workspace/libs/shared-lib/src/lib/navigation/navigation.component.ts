import {Component, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatSidenav} from '@angular/material';
import {UserService} from '../user.service';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'lib-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class LibNavigationComponent {

  @ViewChild(MatSidenav, { static: true })
   drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.mediaObserver.asObservable()
    .pipe(
      map(result => this.mediaObserver.isActive('lt-md'))
    );

  constructor(private mediaObserver: MediaObserver,
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
