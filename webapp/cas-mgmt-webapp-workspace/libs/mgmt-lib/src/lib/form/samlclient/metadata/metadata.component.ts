import {Component, Input, OnInit} from '@angular/core';
import {MgmtFormControl} from '../../mgmt-formcontrol';
import {FormGroup} from '@angular/forms';
import {FormDataService} from '../../../form-data.service';

@Component({
  selector: 'lib-metadata',
  templateUrl: './metadata.component.html'
})
export class SamlMetadataComponent implements OnInit {

  @Input()
  control: FormGroup;
  location: MgmtFormControl;
  maxValidity: MgmtFormControl;
  signatureLocation: MgmtFormControl;
  expirationDuration: MgmtFormControl;
  criteriaPattern: MgmtFormControl;
  criteriaDirection: MgmtFormControl;
  criteriaRoles: MgmtFormControl;
  whiteListBlackListPrecedence: MgmtFormControl;
  requireSignedRoot: MgmtFormControl;
  criteriaRemoveEmptyEntitiesDescriptors: MgmtFormControl;
  criteriaRemoveRolelessEntityDescriptors: MgmtFormControl;

  constructor(public formData: FormDataService) {
  }

  ngOnInit() {
    this.location = this.control.get('location') as MgmtFormControl;
    this.maxValidity = this.control.get('maxValidity') as MgmtFormControl;
    this.signatureLocation = this.control.get('signatureLocation') as MgmtFormControl;
    this.expirationDuration = this.control.get('expirationDuration') as MgmtFormControl;
    this.criteriaPattern = this.control.get('criteriaPattern') as MgmtFormControl;
    this.criteriaRoles = this.control.get('criteriaRoles') as MgmtFormControl;
    this.criteriaDirection = this.control.get('criteriaDirection') as MgmtFormControl;
    this.whiteListBlackListPrecedence = this.control.get('whiteListBlackListPrecedence') as MgmtFormControl;
    this.requireSignedRoot = this.control.get('requireSignedRoot') as MgmtFormControl;
    this.criteriaRemoveEmptyEntitiesDescriptors = this.control.get('criteriaRemoveEmptyEntitiesDescriptors') as MgmtFormControl;
    this.criteriaRemoveRolelessEntityDescriptors = this.control.get('criteriaRemoveRolelessEntityDescriptors') as MgmtFormControl;
  }

}
