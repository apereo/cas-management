import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AppConfigService, FormDataService} from 'mgmt-lib';
import {ControlsService} from '@app/project-share';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public controlService: ControlsService,
              private appConfig: AppConfigService,
              private formData: FormDataService) {
  }

  ngOnInit() {
    if (this.appConfig.config.versionControl) {
      this.controlService.callStatus();
    }
  }

}
