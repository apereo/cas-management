import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-linkrefs',
  templateUrl: './linkrefs.component.html'
})
export class LinkrefsComponent implements OnInit {

  informationUrl: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.informationUrl = new MgmtFormControl(this.data.service.informationUrl, this.data.original.informationUrl);
  }

}
