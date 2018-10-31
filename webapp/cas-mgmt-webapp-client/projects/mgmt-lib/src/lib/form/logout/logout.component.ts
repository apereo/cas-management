import {Component, OnInit} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-logout',
  templateUrl: './logout.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class LogoutComponent implements OnInit {

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
  }

}
