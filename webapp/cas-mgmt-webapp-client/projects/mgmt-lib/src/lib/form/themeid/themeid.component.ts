import {Component, OnInit} from '@angular/core';
import {DataRecord} from '../data';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-themeid',
  templateUrl: './themeid.component.html'
})
export class ThemeidComponent implements OnInit {

  theme: MgmtFormControl;

  constructor(public data: DataRecord) {
  }

  ngOnInit() {
    this.theme = new MgmtFormControl(this.data.service.theme, this.data.original.theme);
  }

}
