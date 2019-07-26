import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-idtoken',
  templateUrl: './idtoken.component.html',
  styleUrls: ['./idtoken.component.css']
})
export class IdtokenComponent implements OnInit {

  @Input()
  control: FormGroup;

  idTokenEncryptionAlg: MgmtFormControl;
  idTokenEncryptionEncoding: MgmtFormControl;
  idTokenSigningAlg: MgmtFormControl;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
    this.idTokenEncryptionAlg = this.control.get('idTokenEncryptionAlg') as MgmtFormControl;
    this.idTokenEncryptionEncoding = this.control.get('idTokenEncryptionEncoding') as MgmtFormControl;
    this.idTokenSigningAlg = this.control.get('idTokenSigningAlg') as MgmtFormControl;
  }

}
