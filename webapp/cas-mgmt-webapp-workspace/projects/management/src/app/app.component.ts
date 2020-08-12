import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AppConfigService} from 'shared-lib';
import {FormDataService} from 'mgmt-lib';
import {ControlsService} from './project-share/controls/controls.service';

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
