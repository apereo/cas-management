import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class LogoutComponent implements OnInit {

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

  checkForSpaces() {
    this.data.service.logoutUrl = this.data.service.logoutUrl ? this.data.service.logoutUrl.trim() : null;
  }

}
