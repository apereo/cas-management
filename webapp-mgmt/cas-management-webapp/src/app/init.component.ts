import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Messages} from './messages';
import {AppConfigService} from './app-config.service';

@Component({
  selector: 'app-init',
  template: ''
})

export class InitComponent implements OnInit {

  constructor(private router: Router,
              public messages: Messages,
              public appService: AppConfigService) {
  }

  ngOnInit() {
    this.appService.getConfig().subscribe(resp => {
      if (this.appService.config.mgmtType === 'DOMAIN') {
        this.router.navigate(['/domains']);
      } else {
        this.router.navigate(['services', 'default']);
      }
    });
  }
}
