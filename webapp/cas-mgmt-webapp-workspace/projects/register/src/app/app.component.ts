import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {UserService, AppConfigService} from '@apereo/mgmt-lib';

/**
 * Entry component for register application.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  constructor(public router: Router,
              public user: UserService,
              public dialog: MatDialog,
              public config: AppConfigService) {
    this.user.getUser().subscribe();
  }

}
