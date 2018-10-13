import {Component, OnInit} from '@angular/core';
import {Messages} from '../../messages';
import {Data} from '../data';
import {ControlContainer, NgForm} from '@angular/forms';

@Component({
  selector: 'app-servicename',
  templateUrl: './servicename.component.html',
  viewProviders: [{
    provide: ControlContainer,
    useExisting: NgForm
  }]
})
export class ServicenameComponent implements OnInit {

  constructor(public messages: Messages,
              public data: Data) {
  }

  ngOnInit() {
  }

}
