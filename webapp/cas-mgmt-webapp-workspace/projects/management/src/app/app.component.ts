import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AppConfigService, ControlsService} from '@apereo/mgmt-lib';

/**
 * Component for application entry.
 *
 * @author Travis Schmidt
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public controlService: ControlsService,
              private appConfig: AppConfigService) {
  }

  /**
   * Get the status of the repoistory if version control enabled.
   */
  ngOnInit() {
    if (this.appConfig.config.versionControl) {
      this.controlService.callStatus();
    }
  }

}
