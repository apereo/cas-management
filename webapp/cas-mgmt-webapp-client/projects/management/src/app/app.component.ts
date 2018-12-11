import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ControlsService} from './project-share/controls/controls.service';
import {FormDataService, AppConfigService} from 'mgmt-lib';

@Component({
  selector: 'mgmt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
