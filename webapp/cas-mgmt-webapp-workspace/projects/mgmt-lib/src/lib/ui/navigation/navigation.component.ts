import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import {MediaObserver} from '@angular/flex-layout';
import {UserService} from '../user.service';
import {ControlsService} from '../controls/controls.service';

/**
 * Component to set up application frame for navigation and main router to display.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'lib-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./navigation.component.css']
})
export class LibNavigationComponent {

  @ViewChild(MatSidenav, { static: true })
  drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.mediaObserver.asObservable()
    .pipe(
      map(() => this.mediaObserver.isActive('lt-md'))
    );

  constructor(private mediaObserver: MediaObserver,
              private userService: UserService,
              public controls: ControlsService,
              private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
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
}
