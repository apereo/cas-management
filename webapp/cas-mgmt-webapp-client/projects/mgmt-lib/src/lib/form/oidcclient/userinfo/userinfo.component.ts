import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  @Input()
  control: FormGroup;

  @Input()
  hideKeys = false;
  userInfoSigningAlg: MgmtFormControl;
  userInfoEncryptedResponseAlg: MgmtFormControl;
  userInfoEncryptedResponseEncoding: MgmtFormControl;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
    this.userInfoSigningAlg = this.control.get('userInfoSigningAlg') as MgmtFormControl;
    this.userInfoEncryptedResponseAlg = this.control.get('userInfoEncryptedResponseAlg') as MgmtFormControl;
    this.userInfoEncryptedResponseEncoding = this.control.get('userInfoEncryptedResponseEncoding') as MgmtFormControl;
  }

}
