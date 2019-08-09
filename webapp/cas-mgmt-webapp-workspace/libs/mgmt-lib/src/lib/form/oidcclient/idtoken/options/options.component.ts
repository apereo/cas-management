import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../../mgmt-formcontrol';
import {FormDataService} from '../../../../form-data.service';

@Component({
  selector: 'lib-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input()
  control: FormGroup;

  signIdToken: MgmtFormControl;
  encryptIdToken: MgmtFormControl;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
    this.signIdToken = this.control.get('signIdToken') as MgmtFormControl;
    this.encryptIdToken = this.control.get('encryptIdToken') as MgmtFormControl;
  }

}
