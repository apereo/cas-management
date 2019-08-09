import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppConfigService} from 'shared-lib';

@Component({
  selector: 'app-init',
  template: ''
})

export class InitComponent implements OnInit {

  constructor(private router: Router,
              public appService: AppConfigService) {
  }

  ngOnInit() {
    this.appService.getConfig().subscribe(() => {
      if (this.appService.config.mgmtType === 'DOMAIN') {
        this.router.navigate(['registry/domains']);
      } else {
        this.router.navigate(['registry/services', 'default']);
      }
    });
  }
}
