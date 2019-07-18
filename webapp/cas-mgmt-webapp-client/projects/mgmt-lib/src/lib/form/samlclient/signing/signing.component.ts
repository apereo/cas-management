import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-signing',
  templateUrl: './signing.component.html',
  styleUrls: ['./signing.component.css']
})
export class SigningComponent implements OnInit {

  @Input()
  control: FormGroup;
  signAssertions: MgmtFormControl;
  signResponses: MgmtFormControl;
  signingCredentialType: MgmtFormControl;
  signingCredentialFingerPrint: MgmtFormControl;
  signingSignatureReferenceDigestMethods: MgmtFormControl;
  signingSignatureAlgorithms: MgmtFormControl;
  signingSignatureBlackListedAlgorithms: MgmtFormControl;
  signingSignatureWhiteListedAlgorithms: MgmtFormControl;
  signingSignatureCanonicalizationAlgorithm: MgmtFormControl;

  constructor(public formData: FormDataService) { }

  ngOnInit() {
    this.signAssertions = this.control.get('signAssertions') as MgmtFormControl;
    this.signResponses = this.control.get('signResponses') as MgmtFormControl;
    this.signingCredentialType = this.control.get('signingCredentialType') as MgmtFormControl;
    this.signingCredentialFingerPrint = this.control.get('signingCredentialFingerPrint') as MgmtFormControl;
    this.signingSignatureReferenceDigestMethods = this.control.get('signingSignatureReferenceDigestMethods') as MgmtFormControl;
    this.signingSignatureAlgorithms = this.control.get('signingSignatureAlgorithms') as MgmtFormControl;
    this.signingSignatureBlackListedAlgorithms = this.control.get('signingSignatureBlackListedAlgorithms') as MgmtFormControl;
    this.signingSignatureWhiteListedAlgorithms = this.control.get('signingSignatureWhiteListedAlgorithms') as MgmtFormControl;
    this.signingSignatureCanonicalizationAlgorithm = this.control.get('signingSignatureCanonicalizationAlgorithm') as MgmtFormControl;
  }

}
