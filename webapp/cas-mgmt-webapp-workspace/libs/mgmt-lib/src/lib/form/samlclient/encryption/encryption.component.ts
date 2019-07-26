import {Component, Input, OnInit} from '@angular/core';
import {FormDataService} from '../../../form-data.service';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';

@Component({
  selector: 'lib-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit {

  @Input()
  control: FormGroup;
  encryptAssertions: MgmtFormControl;
  encryptAttributes: MgmtFormControl;
  encryptionOptional: MgmtFormControl;
  encryptableAttributes: MgmtFormControl;
  encryptionDataAlgorithms: MgmtFormControl;
  encryptionKeyAlgorithms: MgmtFormControl;
  encryptionBlackListedAlgorithms: MgmtFormControl;
  encryptionWhiteListedAlgorithms: MgmtFormControl;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
    this.encryptAssertions = this.control.get('encryptAssertions') as MgmtFormControl;
    this.encryptAttributes = this.control.get('encryptAttributes') as MgmtFormControl;
    this.encryptionOptional = this.control.get('encryptionOptional') as MgmtFormControl;
    this.encryptableAttributes = this.control.get('encryptableAttributes') as MgmtFormControl;
    this.encryptionDataAlgorithms = this.control.get('encryptionDataAlgorithms') as MgmtFormControl;
    this.encryptionKeyAlgorithms = this.control.get('encryptionKeyAlgorithms') as MgmtFormControl;
    this.encryptionBlackListedAlgorithms = this.control.get('encryptionBlackListedAlgorithms') as MgmtFormControl;
    this.encryptionWhiteListedAlgorithms = this.control.get('encryptionWhiteListedAlgorithms') as MgmtFormControl;
  }

}
