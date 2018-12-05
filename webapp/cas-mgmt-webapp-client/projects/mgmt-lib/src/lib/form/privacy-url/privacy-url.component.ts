import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../mgmt-formcontrol';

@Component({
  selector: 'lib-privacy-url',
  templateUrl: './privacy-url.component.html',
  styleUrls: ['./privacy-url.component.css']
})
export class PrivacyUrlComponent implements OnInit {

  @Input()
  control: MgmtFormControl;

  constructor() {
  }

  ngOnInit() {
  }

}
