import { Component, OnInit } from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';
import {DataRecord} from '../data';

@Component({
  selector: 'lib-privacy-url',
  templateUrl: './privacy-url.component.html',
  styleUrls: ['./privacy-url.component.css']
})
export class PrivacyUrlComponent implements OnInit {

  privacyUrl: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.privacyUrl = new MgmtFormControl(this.data.service.privacyUrl, this.data.original.privacyUrl);
  }

}
